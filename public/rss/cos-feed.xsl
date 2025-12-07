<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml" lang="zh-CN">
            <head>
                <title><xsl:value-of select="/rss/channel/title" /> - RSS Feed</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <link rel="stylesheet" type="text/css" href="/rss/cos-feed.css" />
                <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
                    rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&amp;display=swap"
                    rel="stylesheet" />
            </head>
            <body>
                <div class="background-decorations">
                    <div class="floating-shape shape-1"></div>
                    <div class="floating-shape shape-2"></div>
                    <div class="floating-shape shape-3"></div>
                    <div class="stars-container"></div>
                </div>

                <div class="container">
                    <!-- Profile Section -->
                    <header class="profile-header">
                        <div class="profile-card">
                            <div class="avatar-wrapper">
                                <div class="avatar-container">
                                    <img src="/img/avatar.webp" alt="cos" class="avatar" />
                                    <div class="cat-ear left"></div>
                                    <div class="cat-ear right"></div>
                                </div>
                            </div>

                            <div class="profile-info">
                                <h1 class="site-title">余弦の博客</h1>
                                <p class="site-subtitle">WA 的一声就哭了</p>
                                <p class="site-bio">FE / ACG / 手工 / 深色模式强迫症 / INFP / 兴趣广泛养两只猫的老宅女 /
    remote</p>

                                <div class="social-links">
                                    <a href="https://github.com/yusixian" target="_blank"
                                        class="social-btn github" title="GitHub">
                                        <i class="ri-github-fill"></i>
                                    </a>
                                    <a href="https://space.bilibili.com/10730895" target="_blank"
                                        class="social-btn bilibili" title="Bilibili">
                                        <i class="ri-bilibili-fill"></i>
                                    </a>
                                    <a href="https://music.163.com/#/user/home?id=361029804"
                                        target="_blank" class="social-btn music" title="Cloud Music">
                                        <i class="ri-netease-cloud-music-line"></i>
                                    </a>
                                    <a href="mailto:cosine_yu@qq.com" target="_blank"
                                        class="social-btn email" title="Email">
                                        <i class="ri-mail-line"></i>
                                    </a>
                                    <a href="https://x.com/_cosine_x" target="_blank"
                                        class="social-btn twitter" title="Twitter">
                                        <i class="ri-twitter-fill"></i>
                                    </a>
                                    <a href="/rss.xml" target="_blank" class="social-btn rss"
                                        title="RSS">
                                        <i class="ri-rss-line"></i>
                                    </a>
                                </div>
                            </div>

                            <div class="feed-actions">
                                <div class="feed-badge">
                                    <i class="ri-rss-fill"></i> RSS Feed Preview </div>
                                <a class="visit-btn" target="_blank">
                                    <xsl:attribute name="href">
                                        <xsl:value-of select="/rss/channel/link" />
                                    </xsl:attribute>
    访问网站 <i class="ri-arrow-right-line"></i>
                                </a>
                            </div>
                        </div>
                    </header>

                    <main class="feed-content">
                        <div class="content-header">
                            <h2><i class="ri-sparkling-fill"></i> 最近更新</h2>
                            <p class="feed-desc">
                                <xsl:value-of select="/rss/channel/description" />
                            </p>
                        </div>

                        <div class="articles-grid">
                            <xsl:for-each select="/rss/channel/item">
                                <article class="post-card">
                                    <div class="card-glow"></div>
                                    <div class="post-content">
                                        <h3 class="post-title">
                                            <a target="_blank">
                                                <xsl:attribute name="href">
                                                    <xsl:value-of select="link" />
                                                </xsl:attribute>
                                                <xsl:value-of select="title" />
                                            </a>
                                        </h3>
                                        <div class="post-meta">
                                            <!-- 分类显示 -->
                                            <xsl:for-each select="category[starts-with(., 'category:')]">
                                                <xsl:if test="position() = last()">
                                                    <span class="meta-item category">
                                                        <i class="ri-flag-line"></i>
                                                        <xsl:value-of select="substring-after(., 'category:')" />
                                                    </span>
                                                </xsl:if>
                                            </xsl:for-each>
                                            <!-- 日期 -->
                                            <span class="meta-item date">
                                                <i class="ri-calendar-2-line"></i>
                                                <xsl:value-of select="substring(pubDate, 5, 12)" />
                                            </span>
                                        </div>
                                        <p class="post-summary">
                                            <xsl:value-of select="description" />
                                        </p>
                                        <!-- 标签列表 -->
                                        <xsl:if test="category[starts-with(., 'tag:')]">
                                            <div class="post-tags">
                                                <xsl:for-each select="category[starts-with(., 'tag:')]">
                                                    <span class="tag-badge">
                                                        <i class="ri-price-tag-3-line"></i>
                                                        <xsl:value-of select="substring-after(., 'tag:')" />
                                                    </span>
                                                </xsl:for-each>
                                            </div>
                                        </xsl:if>
                                    </div>
                                    <div class="post-footer">
                                        <a class="read-more" target="_blank">
                                            <xsl:attribute name="href">
                                                <xsl:value-of select="link" />
                                            </xsl:attribute>
    阅读全文 <i class="ri-arrow-right-s-line"></i>
                                        </a>
                                    </div>
                                </article>
                            </xsl:for-each>
                        </div>
                    </main>

                    <footer class="page-footer">
                        <p>Designed with <i class="ri-heart-3-fill heart-beat"></i> by Cosine</p>
                        <p class="copyright">
                            <a href="https://aboutfeeds.com" target="_blank">About Feeds</a>
                        </p>
                    </footer>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>