<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
            <head>
                <title><xsl:value-of select="/rss/channel/title" /> Web Feed</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <link rel="stylesheet" type="text/css" href="/rss/cos-feed.css" />
            </head>
            <body class="page-background">
                <nav class="container feed-nav content-body">
                    <p class="feed-notice"> 本页面是 Atom 订阅源，可直接被订阅。 </p>
                    <p class="text-subtle"> 访问 <a href="https://aboutfeeds.com">About Feeds</a>
                        获取更多信息，推荐使用 <a href="https://follow.is/" target="_blank">Follow</a> 订阅。 </p>
                </nav>
                <div class="container feed-content main-container">
                    <header class="feed-header">
                        <h1 class="header-title">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                class="rss-icon" id="RSSicon" viewBox="0 0 256 256">
                                <defs>
                                    <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915"
                                        id="RSSg">
                                        <stop offset="0.0" stop-color="#E3702D" />
                                        <stop offset="0.1071" stop-color="#EA7D31" />
                                        <stop offset="0.3503" stop-color="#F69537" />
                                        <stop offset="0.5" stop-color="#FB9E3A" />
                                        <stop offset="0.7016" stop-color="#EA7C31" />
                                        <stop offset="0.8866" stop-color="#DE642B" />
                                        <stop offset="1.0" stop-color="#D95B29" />
                                    </linearGradient>
                                </defs>
                                <rect width="256" height="256" rx="55" ry="55" x="0" y="0"
                                    fill="#CC5D15" />
                                <rect width="246" height="246" rx="50" ry="50" x="5" y="5"
                                    fill="#F49C52" />
                                <rect width="236" height="236" rx="47" ry="47" x="10" y="10"
                                    fill="url(#RSSg)" />
                                <circle cx="68" cy="189" r="24" fill="#FFF" />
                                <path
                                    d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z"
                                    fill="#FFF" />
                                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z"
                                    fill="#FFF" />
                            </svg> Web Feed
                            Preview </h1>
                        <div class="title-desc-container">
                            <h2>
                                <xsl:value-of select="/rss/channel/title" />
                            </h2>
                            <p class="feed-description">
                                <xsl:value-of select="/rss/channel/description" />
                            </p>
                        </div>
                        <a class="primary-button" target="_blank">
                            <xsl:attribute name="href">
                                <xsl:value-of select="/rss/channel/link" />
                            </xsl:attribute>
                            查看站点 &#x2192; </a>
                    </header>
                    <h2>Recent Items</h2>
                    <xsl:for-each select="/rss/channel/item">
                        <div class="article-card">
                            <h3 class="article-title">
                                <a target="_blank">
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="link" />
                                    </xsl:attribute>
                                    <xsl:value-of select="title" />
                                </a>
                            </h3>
                            <p>
                                <xsl:value-of select="description" />
                            </p>
                            <small class="article-meta"> Published: <xsl:value-of select="pubDate" />
                            </small>
                        </div>
                    </xsl:for-each>
                    <div class="acknowledgement">
                        <h3>致谢</h3>
                        <p>感谢 <a href="https://chinese-font.netlify.app/zh-cn/cdn/" target="_blank">字图
                            CDN</a> 提供的中文字体公益 CDN 服务</p>
                        <p>使用字体为寒蝉全圆体（hcqyt）</p>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>