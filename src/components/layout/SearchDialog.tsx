'use client';
import Dialog from '@components/ui/dialog';
import { Icon } from '@iconify/react';
import { cn } from '@lib/utils';
import { memo, useEffect, useState } from 'react';

interface SearchDialogProps {
  className?: string;
}

const SearchDialogComponent = ({ className }: SearchDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dispatch custom events when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      // Dispatch open event
      window.dispatchEvent(new CustomEvent('search-dialog-open'));
      // Focus search input
      setTimeout(() => {
        const searchInput = document.querySelector('.pagefind-ui__search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 150);
    } else {
      // Dispatch close event BEFORE the DOM is removed
      window.dispatchEvent(new CustomEvent('search-dialog-close'));
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      isDismiss={true}
      overlayClassName="bg-black/50 backdrop-blur-sm"
      className="bg-gradient-start shadow-box w-full max-w-3xl rounded-xl"
      contentClassName="p-6 md:p-3"
      render={({ close }) => (
        <div className="search-dialog">
          {/* Header */}
          <div className="relative mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <Icon icon="ri:search-line" className="size-5 md:size-4" />
              搜索文章
            </h2>
            <button
              onClick={close}
              className="flex size-8 items-center justify-center rounded-full bg-black/5 transition-colors duration-300 hover:bg-black/10 md:size-7 dark:bg-white/10 dark:hover:bg-white/20"
              aria-label="关闭搜索"
            >
              <Icon icon="ri:close-line" className="size-5 md:size-4" />
            </button>
          </div>
          {/* Empty State Hint */}
          <div className="scroll-feather-mask -mx-6 -mb-6 h-[calc(80vh-6rem)] overflow-auto scroll-smooth px-6 pb-6 md:-mx-3 md:px-3">
            <div className="search-empty-hint absolute inset-x-0 top-32 text-center text-sm opacity-60 md:top-28">
              <p>输入关键词搜索博客文章</p>
              <p className="mt-1 text-xs">
                按 <kbd className="rounded bg-black/10 px-1.5 py-0.5 font-mono dark:bg-white/10">ESC</kbd> 关闭
              </p>
            </div>
            {/* Search Container */}
            <div id="search-dialog-container" />
          </div>
        </div>
      )}
    >
      <button
        className={cn('group cursor-pointer transition duration-300 hover:scale-125', className)}
        aria-label="搜索"
        title="搜索 (⌘K)"
      >
        <Icon icon="ri:search-line" className="size-8" />
      </button>
    </Dialog>
  );
};

export default memo(SearchDialogComponent);
