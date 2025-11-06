/**
 * HeadingList Component
 *
 * Renders a list of heading items with accordion behavior.
 * Handles the recursive rendering logic for nested headings.
 */

import type { Heading } from '@hooks/useHeadingTree';
import { HeadingTreeItem } from './HeadingTreeItem';

interface HeadingListProps {
  /** Array of heading nodes to render */
  headings: Heading[];
  /** Current nesting depth (0 for top level) */
  depth?: number;
  /** ID of the currently active heading */
  activeId: string | null;
  /** Set of expanded heading IDs */
  expandedIds: Set<string>;
  /** Callback when a heading is clicked */
  onHeadingClick: (id: string) => void;
}

/**
 * HeadingList - Renders a recursive list of table of contents headings
 */
export function HeadingList({ headings, depth = 0, activeId, expandedIds, onHeadingClick }: HeadingListProps) {
  /**
   * Recursively render child headings
   */
  const renderChildren = (children: Heading[], childDepth: number): React.ReactElement[] => {
    return children.map((child) => (
      <HeadingTreeItem
        key={child.id}
        heading={child}
        depth={childDepth}
        isActive={activeId === child.id}
        isExpanded={expandedIds.has(child.id)}
        onHeadingClick={onHeadingClick}
        renderChildren={renderChildren}
      />
    ));
  };

  return (
    <>
      {headings.map((heading) => (
        <HeadingTreeItem
          key={heading.id}
          heading={heading}
          depth={depth}
          isActive={activeId === heading.id}
          isExpanded={expandedIds.has(heading.id)}
          onHeadingClick={onHeadingClick}
          renderChildren={renderChildren}
        />
      ))}
    </>
  );
}
