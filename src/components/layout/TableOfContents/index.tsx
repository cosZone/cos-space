/**
 * TableOfContents Component (Refactored)
 *
 * Displays a hierarchical table of contents with active heading detection and accordion behavior.
 * Now uses custom hooks for better separation of concerns and testability.
 */

import { findHeadingById, getParentIds, getSiblingIds, useActiveHeading, useExpandedState, useHeadingTree } from '@hooks/index';

// Constants
const SCROLL_OFFSET_TOP = 120; // Offset for header height when detecting active heading
const INDENT_BASE = 0.75; // Base left padding in rem
const INDENT_PER_LEVEL = 1; // Additional padding per nesting level in rem

interface TableOfContentsProps {
  /** Whether headings should be expanded by default */
  defaultExpanded?: boolean;
}

/**
 * TableOfContents Component
 */
export function TableOfContents({ defaultExpanded = false }: TableOfContentsProps = {}) {
  // Use custom hooks for heading tree, active heading, and expand/collapse state
  const headings = useHeadingTree();
  const activeId = useActiveHeading({ offsetTop: SCROLL_OFFSET_TOP });
  const { expandedIds, isExpanded, setExpandedIds } = useExpandedState({
    headings,
    activeId,
    defaultExpanded,
  });

  /**
   * Handle heading click - scroll to heading and update expand state
   */
  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Trigger expand logic for this heading
      const clickedHeading = findHeadingById(headings, id);
      if (clickedHeading) {
        const parentIds = getParentIds(clickedHeading);
        // Include the clicked heading itself if it has children
        if (clickedHeading.children.length > 0) {
          parentIds.unshift(id);
        }

        if (parentIds.length > 0) {
          setExpandedIds((prev) => {
            const newSet = new Set(prev);

            // For each parent level, apply accordion effect
            const parentsByLevel: { [level: number]: string[] } = {};

            // Group parents by level
            parentIds.forEach((parentId) => {
              const parentHeading = findHeadingById(headings, parentId);
              if (parentHeading) {
                if (!parentsByLevel[parentHeading.level]) {
                  parentsByLevel[parentHeading.level] = [];
                }
                parentsByLevel[parentHeading.level].push(parentId);
              }
            });

            // For each level, close siblings and open the required parent
            Object.keys(parentsByLevel).forEach((levelStr) => {
              const level = parseInt(levelStr);
              const parentsAtLevel = parentsByLevel[level];

              parentsAtLevel.forEach((parentId) => {
                const parentHeading = findHeadingById(headings, parentId);
                if (parentHeading) {
                  // Close siblings at this level
                  const siblingIds = getSiblingIds(parentHeading, headings);
                  siblingIds.forEach((siblingId) => newSet.delete(siblingId));

                  // Open this parent
                  newSet.add(parentId);
                }
              });
            });

            return newSet;
          });
        }
      }
    }
  };

  /**
   * Recursively render headings with proper nesting
   */
  const renderHeadings = (headings: ReturnType<typeof useHeadingTree>, depth = 0): React.ReactElement[] => {
    return headings.flatMap((heading) => {
      const isActive = activeId === heading.id;
      const expanded = isExpanded(heading.id);
      const hasChildren = heading.children.length > 0;

      const elements: React.ReactElement[] = [
        <div key={heading.id} className="relative">
          <a
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleHeadingClick(heading.id);
            }}
            className={`group hover:bg-muted/60 hover:text-foreground relative flex items-center rounded-md py-2 text-sm transition-all duration-200 ${
              isActive
                ? 'bg-primary/10 text-primary border-l-primary hover:text-primary hover:bg-primary/10 border-l-2 font-medium'
                : 'text-muted-foreground hover:border-l-primary/40 hover:border-l-2'
            } `}
            style={{
              paddingLeft: `${INDENT_BASE + depth * INDENT_PER_LEVEL}rem`,
              paddingRight: hasChildren ? '0.5rem' : '0.75rem',
            }}
            aria-label={heading.text}
          >
            {/* 标题文本 */}
            <span className="block flex-1 truncate leading-relaxed">{heading.text}</span>
            {/* 活跃状态指示器 */}
            {isActive && <span className="text-primary ml-2 text-xs">•</span>}
          </a>
        </div>,
      ];

      // Add children if expanded
      if (hasChildren && expanded) {
        elements.push(...renderHeadings(heading.children, depth + 1));
      }

      return elements;
    });
  };

  // Empty state
  if (headings.length === 0) {
    return (
      <div className="text-muted-foreground py-6 text-center">
        <div className="text-sm">暂无目录</div>
      </div>
    );
  }

  return (
    <nav className="toc-container max-h-[90vh] overflow-auto" aria-label="文章目录">
      <div className="space-y-1 pr-2">{renderHeadings(headings)}</div>
    </nav>
  );
}
