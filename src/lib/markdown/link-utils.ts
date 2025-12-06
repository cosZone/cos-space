/**
 * Link detection and classification utilities for markdown processing
 */

export interface LinkInfo {
  url: string;
  type: 'tweet' | 'general';
  tweetId?: string;
}

/**
 * Extract Tweet ID from Twitter/X URL
 * Supports formats:
 * - https://twitter.com/username/status/1234567890
 * - https://x.com/username/status/1234567890
 * - https://twitter.com/i/web/status/1234567890
 * - With query parameters
 */
export function extractTweetId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check if it's a Twitter/X domain
    if (!['twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'].includes(hostname)) {
      return null;
    }

    // Match status ID from path
    const match = urlObj.pathname.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  } catch (error) {
    console.warn('[Link Utils] Failed to parse URL:', url, error);
    return null;
  }
}

/**
 * Check if URL is a Twitter/X link
 */
export function isTweetUrl(url: string): boolean {
  return extractTweetId(url) !== null;
}

/**
 * Classify a link and extract relevant information
 */
export function classifyLink(url: string): LinkInfo {
  const tweetId = extractTweetId(url);

  if (tweetId) {
    return {
      url,
      type: 'tweet',
      tweetId,
    };
  }

  return {
    url,
    type: 'general',
  };
}

/**
 * Check if a node is a standalone paragraph with only a link
 * Used in remark plugin to detect links that should be embedded
 */
export function isStandaloneLinkParagraph(node: any): boolean {
  // Check if node is a paragraph
  if (node.type !== 'paragraph') {
    return false;
  }

  // Check if paragraph has exactly one child
  if (!node.children || node.children.length !== 1) {
    return false;
  }

  const child = node.children[0];

  // Check if the child is a link
  if (child.type !== 'link') {
    return false;
  }

  // Check if link text is the same as URL (auto-linked URL)
  // or if link only contains text matching the URL
  if (child.children && child.children.length === 1) {
    const textNode = child.children[0];
    if (textNode.type === 'text') {
      // Allow the link if text is the URL itself or very similar
      const text = textNode.value.trim();
      const url = child.url.trim();
      return text === url || url.endsWith(text) || text.endsWith(url);
    }
  }

  return false;
}
