/**
 * TableOfContents Component (Refactored with Sub-components)
 *
 * Displays a hierarchical table of contents with active heading detection and accordion behavior.
 * Uses custom hooks for state management and sub-components for better organization.
 */

import { findHeadingById, getParentIds, getSiblingIds, useActiveHeading, useExpandedState, useHeadingTree } from '@hooks/index';
import { HeadingList } from './HeadingList';

// Constants
const SCROLL_OFFSET_TOP = 120; // Offset for header height when detecting active heading

interface TableOfContentsProps {
  /** Whether headings should be expanded by default */
  defaultExpanded?: boolean;
}

/**
 * TableOfContents Component
 *
 * Main container for the table of contents. Manages heading state and
 * delegates rendering to HeadingList sub-component.
 */
export function TableOfContents({ defaultExpanded = false }: TableOfContentsProps = {}) {
  // Use custom hooks for heading tree, active heading, and expand/collapse state
  const headings = useHeadingTree();
  const activeId = useActiveHeading({ offsetTop: SCROLL_OFFSET_TOP });
  const { expandedIds, setExpandedIds } = useExpandedState({
    headings,
    activeId,
    defaultExpanded,
  });

  /**
   * Handle heading click - scroll to heading and update expand state with accordion behavior
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
      <div className="space-y-1 pr-2">
        <HeadingList
          headings={headings}
          depth={0}
          activeId={activeId}
          expandedIds={expandedIds}
          onHeadingClick={handleHeadingClick}
        />
      </div>
    </nav>
  );
}
