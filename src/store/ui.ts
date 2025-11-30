/**
 * Global UI State Management
 *
 * Nanostores-based global state for UI components that need to communicate across
 * the Astro/React boundary.
 *
 * This replaces the previous CustomEvent pattern for better type safety and reactivity.
 *
 * @example
 * ```tsx
 * // In MenuIcon.tsx
 * import { drawerOpen } from '@store/ui';
 *
 * function MenuIcon() {
 *   const handleToggle = () => {
 *     drawerOpen.set(!drawerOpen.get());
 *   };
 * }
 *
 * // In HomeSider.astro or FloatingGroup.astro
 * import { drawerOpen } from '@store/ui';
 * import { useStore } from '@nanostores/react';
 *
 * function Sidebar() {
 *   const isDrawerOpen = useStore(drawerOpen);
 *   // Component reacts to state changes
 * }
 * ```
 */

import { atom } from 'nanostores';

/**
 * Mobile drawer open/close state
 *
 * Controls the visibility of the mobile navigation drawer/sidebar.
 * Used by MenuIcon, HomeSider, and FloatingGroup components.
 */
export const drawerOpen = atom<boolean>(false);

/**
 * Mobile menu open/close state
 *
 * Controls the visibility of the mobile dropdown menu.
 * Used for responsive navigation menus.
 */
export const mobileMenuOpen = atom<boolean>(false);

/**
 * Modal open/close state
 *
 * Generic modal state for future use.
 */
export const modalOpen = atom<boolean>(false);

/**
 * Search modal open/close state
 *
 * Controls the visibility of the search modal.
 */
export const searchOpen = atom<boolean>(false);

/**
 * Code fullscreen data
 *
 * Contains the data for the code block fullscreen dialog.
 * When set to non-null, the dialog opens. When set to null, it closes.
 */
export interface CodeBlockData {
  code: string;
  codeHTML: string;
  language: string;
  preClassName: string;
  preStyle: string;
  codeClassName: string;
}

export const codeFullscreenData = atom<CodeBlockData | null>(null);

/**
 * Helper functions for common operations
 */

/**
 * Toggle drawer state
 */
export function toggleDrawer(): void {
  drawerOpen.set(!drawerOpen.get());
}

/**
 * Open drawer
 */
export function openDrawer(): void {
  drawerOpen.set(true);
}

/**
 * Close drawer
 */
export function closeDrawer(): void {
  drawerOpen.set(false);
}

/**
 * Toggle mobile menu state
 */
export function toggleMobileMenu(): void {
  mobileMenuOpen.set(!mobileMenuOpen.get());
}

/**
 * Toggle modal state
 */
export function toggleModal(): void {
  modalOpen.set(!modalOpen.get());
}

/**
 * Toggle search state
 */
export function toggleSearch(): void {
  searchOpen.set(!searchOpen.get());
}

/**
 * Open search dialog
 */
export function openSearch(): void {
  searchOpen.set(true);
}

/**
 * Close search dialog
 */
export function closeSearch(): void {
  searchOpen.set(false);
}

/**
 * Open code fullscreen dialog with data
 */
export function openCodeFullscreen(data: CodeBlockData): void {
  codeFullscreenData.set(data);
}

/**
 * Close code fullscreen dialog
 */
export function closeCodeFullscreen(): void {
  codeFullscreenData.set(null);
}
