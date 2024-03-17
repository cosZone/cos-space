import { MAIN_MARKDOWN_ID } from '@/constants/dom-id';
import { cn } from '@/lib/utils';
import _ from 'lodash-es';
import { MarkdownToJSX, compiler } from 'markdown-to-jsx';
import Script from 'next/script';
import { FC, PropsWithChildren, Suspense, createElement, memo, useMemo, useRef } from 'react';
import mdStyles from './markdown.module.css';
import { MHeader } from './renderers/heading';
import { MParagraph } from './renderers/paragraph';
import { MCodeBlock } from './renderers/codeblock';
import { MLink } from './renderers/link';

export interface MdProps {
  value?: string;

  style?: React.CSSProperties;
  readonly renderers?: { [key: string]: Partial<MarkdownToJSX.Rule> };
  wrapperProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  codeBlockFully?: boolean;
  className?: string;
  as?: React.ElementType;

  allowsScript?: boolean;
}
export const Markdown: FC<MdProps & MarkdownToJSX.Options & PropsWithChildren> = memo((props) => {
  const {
    value,
    renderers,
    style,
    wrapperProps = {},
    codeBlockFully = false,
    className,
    overrides,
    as: As = 'div',
    allowsScript = false,
    ...rest
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const headsOverrideProps = useMemo(() => {
    const allHead = _.range(1, 7);
    const headsOverrideProps: any = {};

    for (const level of allHead) {
      headsOverrideProps[`h${level}`] = {
        component: MHeader,
        props: {
          level: level,
        },
      };
    }
    return headsOverrideProps;
  }, []);

  const node = useMemo(() => {
    if (!value && typeof props.children != 'string') return null;

    const mdElement = compiler(`${value || props.children}`, {
      wrapper: null,
      createElement: (type, props, children) => {
        if (type === 'pre') return createElement('div', props, children);
        return createElement(type, props, children);
      },
      // @ts-ignore
      overrides: {
        ...headsOverrideProps,
        p: MParagraph,
        a: MLink,
        // thead: MTableHead,
        // tr: MTableRow,
        // tbody: MTableBody,
        // table: MTable,
        // details: MDetails,
        // img: MarkdownImage,
        // tag: MTag,
        code: MCodeBlock,
        // custom react component
        // Tag: MTag,

        script: allowsScript ? Script : undefined,

        ...overrides,
      },
      slugify: (str) => str,
      ...rest,
    });

    return mdElement;
  }, [value, props.children, headsOverrideProps, allowsScript, overrides, rest]);

  return (
    <Suspense>
      <As
        style={style}
        {...wrapperProps}
        ref={ref}
        className={cn(mdStyles['md'], codeBlockFully ? mdStyles['code-fully'] : undefined, className)}
      >
        {node}
      </As>
    </Suspense>
  );
});
Markdown.displayName = 'Markdown';

export const MainMarkdown: FC<MdProps & MarkdownToJSX.Options & PropsWithChildren> = (props) => {
  const { wrapperProps = {} } = props;
  return (
    <Markdown
      as="main"
      {...props}
      wrapperProps={useMemo(
        () => ({
          ...wrapperProps,
          id: MAIN_MARKDOWN_ID,
        }),
        [wrapperProps],
      )}
    />
  );
};
