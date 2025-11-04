/**
 * Type Definitions Barrel Export
 *
 * This file provides a convenient single import point for all type definitions.
 * Import from '@types' instead of '@types/specific-file' when you need multiple types.
 */

// UI types
export type {
  Size,
  ButtonVariant,
  BadgeVariant,
  OpenCloseState,
  ControlledComponentProps,
  OptionType,
  FloatingPosition,
  WithClassName,
  WithChildren,
  ForwardedRef,
} from './ui';

// Component props
export type {
  PostItemCardProps,
  SegmentedProps,
  DropdownNavProps,
  PopoverProps,
  TooltipProps,
  MenuIconProps,
  TableOfContentsProps,
  NavItemProps,
  ErrorBoundaryProps,
  CoverProps,
} from './components';

// Content types
export type {
  BlogPost,
  BlogSchema,
  Category,
  CategoryWithCount,
  CategoryListResult,
  TagWithCount,
  PostMetadata,
  PaginatedResult,
} from './content';

// Animation types
export type {
  SpringConfig,
  AnimationDirection,
  AnimationTrigger,
  AnimationVariantName,
  MotionVariants,
  AnimationTiming,
  FadeInProps,
  SlideInProps,
  ExpandProps,
  StaggerProps,
  SpringPreset,
} from './animation';
