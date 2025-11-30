'use client';

import Dialog from '@components/ui/dialog';
import { Icon } from '@iconify/react';
import { copyToClipboard } from '@lib/code-block-enhancer';
import { cn } from '@lib/utils';
import { memo, useCallback, useDeferredValue, useEffect, useState } from 'react';

/**
 * Parse inline style string to React style object
 */
function parseInlineStyle(styleString: string): React.CSSProperties {
  if (!styleString) return {};

  const styles: React.CSSProperties = {};
  const declarations = styleString.split(';').filter((s) => s.trim());

  declarations.forEach((declaration) => {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex === -1) return;

    const property = declaration.slice(0, colonIndex).trim();
    const value = declaration.slice(colonIndex + 1).trim();

    if (!property || !value) return;

    // CSS variables (--*) should be kept as-is
    if (property.startsWith('--')) {
      (styles as any)[property] = value;
    } else {
      // Convert kebab-case to camelCase (e.g., background-color -> backgroundColor)
      const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      (styles as any)[camelProperty] = value;
    }
  });

  return styles;
}

interface CodeBlockData {
  code: string;
  codeHTML: string;
  language: string;
  preClassName: string;
  preStyle: string;
  codeClassName: string;
}

function CodeBlockFullscreenComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<CodeBlockData>({
    code: '',
    codeHTML: '',
    language: 'text',
    preClassName: '',
    preStyle: '',
    codeClassName: '',
  });

  // 延迟渲染代码内容，让 Dialog 动画优先执行
  const deferredCodeHTML = useDeferredValue(data.codeHTML);

  // Listen for custom event from Astro script
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<CodeBlockData>;
      setData(customEvent.detail);
      setIsOpen(true);
    };

    window.addEventListener('open-code-fullscreen', handleOpen);
    return () => {
      window.removeEventListener('open-code-fullscreen', handleOpen);
    };
  }, []);

  // 清理复制状态的 timer
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(data.code);
    if (success) {
      setCopied(true);
    }
  }, [data.code]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      isDismiss={true}
      overlayClassName="bg-black/80 backdrop-blur-sm"
      className="w-[90vw] max-w-6xl overflow-hidden rounded-xl shadow-2xl md:max-w-[90vw]"
      contentClassName="p-0"
      render={({ close }) => (
        <div className="flex h-[85vh] flex-col">
          {/* Toolbar - 固定在顶部，样式与 markdown.css 一致 */}
          <div className="border-border bg-muted/50 flex shrink-0 items-center justify-between border-b px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-muted-foreground font-mono text-xs font-medium tracking-wider uppercase">
                {data.language}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                className={cn(
                  'text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-1.5 transition-colors',
                  copied && 'text-primary hover:text-primary',
                )}
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                    <mask id="checkmark-anim">
                      <g
                        fill="none"
                        stroke="#fff"
                        strokeDasharray="24"
                        strokeDashoffset="24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      >
                        <path d="M2 13.5l4 4l10.75 -10.75">
                          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" />
                        </path>
                        <path stroke="#000" strokeWidth="6" d="M7.5 13.5l4 4l10.75 -10.75">
                          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
                        </path>
                        <path d="M7.5 13.5l4 4l10.75 -10.75">
                          <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0" />
                        </path>
                      </g>
                    </mask>
                    <rect width="24" height="24" fill="currentColor" mask="url(#checkmark-anim)" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512" fill="currentColor">
                    <path d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0 0 16-192 0 0-256 16 0 0-64-16 0z" />
                  </svg>
                )}
                <span className="text-sm">{copied ? '已复制' : '复制'}</span>
              </button>
              <button
                onClick={close}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md p-2 transition-colors"
                aria-label="关闭"
              >
                <Icon icon="ri:close-line" className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Code Content - 独立滚动 */}
          <div className="flex-1 overflow-auto">
            <pre className={cn(data.preClassName, 'p-4')} style={{ ...parseInlineStyle(data.preStyle) }}>
              {/* SAFE: codeHTML comes from Shiki syntax highlighter output only */}
              <code className={data.codeClassName} dangerouslySetInnerHTML={{ __html: deferredCodeHTML }} />
            </pre>
          </div>
        </div>
      )}
    />
  );
}

export default memo(CodeBlockFullscreenComponent);
