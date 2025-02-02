<?xml version="1.0" encoding="utf-8"?>
<!--
  
## Credits
https://www.caro.fyi/articles/pretty-rss/

-->
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="cs">
      <head>
        <title>
          <xsl:value-of select="/rss/channel/title"/> - Webový feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <style type="text/css">*,::after,::before{box-sizing:border-box}*{margin:0}body{line-height:1.5;-webkit-font-smoothing:antialiased;font-size:1.1em;font-family:sans-serif;margin:2em auto;max-width:70ch;color:#1f2937}h1,h2,h3,h4,h5,h6,p{overflow-wrap:break-word}a{color:#7c3aed}a:focus,a:hover{color:#5b21b6}nav{background:#ede9fe;padding:.8em 1.2em;border-radius:.5em}p{text-wrap:pretty;}h1,h2,h3{margin-top:1em}</style>
      </head>
      <body>
        <nav>
          <p>
            <strong>Toto je webový kanál,</strong> také známý jako RSS kanál. <strong>Přihlaste se k odběru</strong> tím, že zkopírujete adresu URL z adresního řádku do Vaší čtečky RSS. Navštivte <a href="https://aboutfeeds.com">About Feeds</a> ohledně informací k RSS.
          </p>
        </nav>
        <div>
          <header>
            <h1>
              <xsl:value-of select="/rss/channel/title"/> - RSS kanál
            </h1>
            <p>
              <xsl:value-of select="/rss/channel/description"/>
            </p>
            <a target="_blank">
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Navštivte stránku &#x2192;
            </a>
          </header>
          <h2>Nedávné příspěvky</h2>
          <xsl:for-each select="/rss/channel/item[position() &lt; 10]">
            <div>
              <h3>
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <small>
                Publikováno: <xsl:value-of select="pubDate" />
              </small>
              <p >
                <xsl:value-of select="description" />
              </p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
