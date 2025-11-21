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

  // Focus search input when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Wait for animation and Pagefind to initialize
      setTimeout(() => {
        const searchInput = document.querySelector('.pagefind-ui__search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }, 150);
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      isDismiss={true}
      overlayClassName="bg-black/50 backdrop-blur-sm"
      className="bg-gradient-start shadow-box w-full max-w-2xl rounded-xl"
      contentClassName="p-6"
      render={({ close }) => (
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors duration-300 hover:bg-white/20"
            aria-label="关闭搜索"
          >
            <Icon icon="ri:close-line" className="size-5" />
          </button>

          {/* Search Container */}
          <div id="search-dialog-container" />
        </div>
      )}
    >
      <button
        className={cn('group cursor-pointer transition duration-300 hover:scale-125', className)}
        aria-label="搜索"
        title="搜索 (⌘K)"
      >
        <Icon icon="ri:search-line" className="size-9" />
      </button>
    </Dialog>
  );
};

export default memo(SearchDialogComponent);
