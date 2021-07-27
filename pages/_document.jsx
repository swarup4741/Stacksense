import Document, { Head, Html, Main, NextScript } from 'next/document';

class Stacksense_Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" style={{ scrollBehavior: 'smooth' }}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Stacksense_Document;
