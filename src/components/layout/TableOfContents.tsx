import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const articleContent = document.querySelector('article');
    if (!articleContent) return;

    // 获取文章中的所有标题元素
    const headingElements = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // 如果没有标题，则不显示目录
    if (headingElements.length === 0) return;

    // 处理标题元素
    const headingsData: Heading[] = Array.from(headingElements).map((heading, index) => {
      // 为每个标题添加ID（如果没有）
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      return {
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1)), // 获取标题级别 (1-6)
      };
    });

    setHeadings(headingsData);

    // 监听滚动事件，更新当前活动的标题
    const handleScroll = () => {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));

      // 找到当前视口中最靠上的标题
      for (const heading of headingElements) {
        const { top } = heading.getBoundingClientRect();
        if (top > 0 && top < window.innerHeight / 2) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 初始检查
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return <div className="text-muted-foreground py-4 text-center text-sm">目录为空喵~</div>;
  }

  return (
    <div className="toc-container max-h-[calc(100vh-200px)] w-full overflow-auto">
      <div className="flex flex-col gap-2 pl-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleHeadingClick(heading.id);
            }}
            className={`hover:text-primary block truncate text-sm transition duration-300 ${
              activeId === heading.id ? 'text-primary font-medium' : ''
            }`}
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            {heading.text}
          </a>
        ))}
      </div>
    </div>
  );
}
