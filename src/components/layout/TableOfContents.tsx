import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
  children: Heading[];
  parent?: Heading;
}

interface TableOfContentsProps {
  defaultExpanded?: boolean; // Configuration option for default expand/collapse state
}

// Calculate hierarchical numbering for headings
function calculateHeadingNumbers(headings: Heading[]): void {
  const counters: number[] = [0, 0, 0, 0, 0, 0]; // counters for h1-h6

  function processHeading(heading: Heading) {
    const level = heading.level;

    // Increment current level counter
    counters[level - 1]++;

    // Reset all deeper level counters
    for (let i = level; i < 6; i++) {
      counters[i] = 0;
    }

    // Generate number string (e.g., "1.2.3.")
    const numberParts = [];
    for (let i = 0; i < level; i++) {
      if (counters[i] > 0) {
        numberParts.push(counters[i]);
      }
    }
    const numberStr = numberParts.join('.') + '. ';

    heading.text = numberStr + heading.text;

    // Process children
    heading.children.forEach(processHeading);
  }

  headings.forEach(processHeading);
}

// Build hierarchical structure from flat heading list
function buildHeadingTree(flatHeadings: Array<{ id: string; text: string; level: number }>): Heading[] {
  const tree: Heading[] = [];
  const stack: Heading[] = [];

  flatHeadings.forEach((heading) => {
    const newHeading: Heading = {
      ...heading,
      children: [],
    };

    // Find the appropriate parent
    while (stack.length > 0 && stack[stack.length - 1].level >= newHeading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      // This is a root level heading
      tree.push(newHeading);
    } else {
      // This is a child of the last item in stack
      const parent = stack[stack.length - 1];
      parent.children.push(newHeading);
      newHeading.parent = parent;
    }

    stack.push(newHeading);
  });

  return tree;
}

export function TableOfContents({ defaultExpanded = false }: TableOfContentsProps = {}) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Find a heading by ID in the tree structure
  const findHeadingById = (headings: Heading[], id: string): Heading | null => {
    for (const heading of headings) {
      if (heading.id === id) {
        return heading;
      }
      const found = findHeadingById(heading.children, id);
      if (found) {
        return found;
      }
    }
    return null;
  };

  // Get all parent IDs for a given heading
  const getParentIds = (heading: Heading): string[] => {
    const parentIds: string[] = [];
    let current = heading.parent;
    while (current) {
      parentIds.push(current.id);
      current = current.parent;
    }
    return parentIds;
  };

  // Get all siblings of a heading (headings at the same level with the same parent)
  const getSiblingIds = (targetHeading: Heading): string[] => {
    const siblings: string[] = [];

    if (!targetHeading.parent) {
      // This is a root level heading, get all root level headings
      headings.forEach((heading) => {
        if (heading.id !== targetHeading.id && heading.children.length > 0) {
          siblings.push(heading.id);
        }
      });
    } else {
      // This has a parent, get all children of the parent
      targetHeading.parent.children.forEach((heading) => {
        if (heading.id !== targetHeading.id && heading.children.length > 0) {
          siblings.push(heading.id);
        }
      });
    }

    return siblings;
  };

  // Auto-expand parents when activeId changes
  useEffect(() => {
    if (activeId && headings.length > 0) {
      const activeHeading = findHeadingById(headings, activeId);
      if (activeHeading) {
        const parentIds = getParentIds(activeHeading);

        // Include the active heading itself if it has children
        const allHeadingsToProcess = [...parentIds];
        if (activeHeading.children.length > 0) {
          allHeadingsToProcess.unshift(activeId);
        }

        if (allHeadingsToProcess.length > 0) {
          setExpandedIds((prev) => {
            const newSet = new Set(prev);

            // For each parent level, apply accordion effect
            const parentsByLevel: { [level: number]: string[] } = {};

            // Group parents by level
            allHeadingsToProcess.forEach((parentId) => {
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
                  const siblingIds = getSiblingIds(parentHeading);
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
  }, [activeId, headings]);

  useEffect(() => {
    const articleContent = document.querySelector('article');
    if (!articleContent) return;

    // Get all heading elements in the article
    const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // If no headings, don't show TOC
    if (headingElements.length === 0) return;

    // Process heading elements
    const flatHeadings: Array<{ id: string; text: string; level: number }> = Array.from(headingElements).map(
      (heading, index) => {
        // Use existing ID or create fallback ID
        let id = heading.id;
        if (!id) {
          // Create slug-like ID from text content
          const text = heading.textContent || '';
          id =
            text
              .toLowerCase()
              .replace(/[^\w\s-]/g, '') // Remove special characters except words, spaces, hyphens
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .trim() || `heading-${index}`; // Fallback to index-based ID

          // Set the ID on the element for future use
          heading.id = id;
        }

        return {
          id,
          text: heading.textContent || '',
          level: parseInt(heading.tagName.substring(1)), // Get heading level (1-6)
        };
      },
    );

    // Build hierarchical structure
    const headingTree = buildHeadingTree(flatHeadings);

    // Calculate numbering for each heading
    calculateHeadingNumbers(headingTree);
    setHeadings(headingTree);

    // Set initial expanded state based on configuration
    if (defaultExpanded) {
      const allIds = new Set<string>();
      function collectIds(headings: Heading[]) {
        headings.forEach((heading) => {
          if (heading.children.length > 0) {
            allIds.add(heading.id);
          }
          collectIds(heading.children);
        });
      }
      collectIds(headingTree);
      setExpandedIds(allIds);
    }

    // Listen for scroll events to update active heading
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

      // Find the currently visible heading
      let current = '';
      for (const heading of headingElements) {
        const rect = heading.getBoundingClientRect();
        // Check if heading is in viewport or above it (with some offset for header)
        if (rect.top <= 120) {
          current = heading.id;
        } else {
          break;
        }
      }

      if (current && current !== activeId) {
        setActiveId(current);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeId, defaultExpanded]);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Immediately set activeId and trigger expand logic
      setActiveId(id);

      // Also immediately trigger the expand logic for this heading
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
                  const siblingIds = getSiblingIds(parentHeading);
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

  const renderHeadings = (headings: Heading[], depth = 0): React.ReactElement[] => {
    return headings.flatMap((heading) => {
      const isActive = activeId === heading.id;
      const isExpanded = expandedIds.has(heading.id);
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
              paddingLeft: `${0.75 + depth * 1}rem`,
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
      if (hasChildren && isExpanded) {
        elements.push(...renderHeadings(heading.children, depth + 1));
      }

      return elements;
    });
  };

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
