import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Heartfelt Advice From The Soul of a New Machine!"
          />
          <meta property="og:site_name" content="dearaibby.com" />
          <meta
            property="og:description"
            content="Heartfelt Advice From The Soul of a New Machine!"
          />
          <meta property="og:title" content="Dear Aibby" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Dear Aibby" />
          <meta
            name="twitter:description"
            content="Heartfelt Advice From The Soul of a New Machine!"
          />
          <meta
            property="og:image"
            content="https://dearaibby.com/aibby.jpg"
          />
          <meta
            name="twitter:image"
            content="https://dearaibby.com/aibby.jpg"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
