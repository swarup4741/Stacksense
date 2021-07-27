import Head from "next/head";

const Meta = props => (
  <Head>
    <link
      href="/fonts/ProductSans-Regular.woff2"
      as="font"
      type="font/woff2"
      rel="preload"
      crossOrigin="anonymous"
    />
    <link
      href="/fonts/ProductSans-Bold.woff2"
      as="font"
      type="font/woff2"
      rel="preload"
      crossOrigin="anonymous"
    />
    <link rel="shortcut icon" href="/favicons/favicon.ico" />
    <link rel="manifest" href="/favicons/site.webmanifest" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/favicons/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/favicons/favicon-16x16.png"
    />
    <link
      rel="mask-icon"
      href="/favicons/safari-pinned-tab.svg"
      color="#7442ff"
    />
    <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Stacksense" />
    <meta name="application-name" content="Stacksense" />
    <meta name="msapplication-TileColor" content="#2d263f" />
    <meta name="theme-color" content="#ffffff"></meta>
    <link rel="canonical" href="" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <title>{props.title}</title>
    <meta
      name="description"
      content="Store your essential documents, pictures and other things so that you never forget them"
    />
    <meta property="og:type" content="website" />
    <meta
      name="og:title"
      property="og:title"
      content="Stacksense | carry your essentials"
    />
    <meta
      name="og:description"
      property="og:description"
      content="Store your essential documents, pictures and other things so that you never forget them"
    />
    <meta property="og:site_name" content="Stacksense" />
    <meta property="og:url" content="https://stacksense.vercel.app" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Stacksense" />
    <meta
      name="twitter:description"
      content="Store your essential documents, pictures and other things so that you never forget them"
    />
    <meta name="twitter:site" content="Stacksense" />
    <meta name="twitter:creator" content="@swarup4741" />
    <meta
      property="og:image"
      content="https://stackense.vercel.app/favicons/twitter-image.png"
    />
    <meta
      name="twitter:image"
      content="https://stackense.vercel.app/favicons/twitter-image.png"
    />

    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-square70x70logo" content="/mstile-70x70.png" />
    <meta
      name="msapplication-square144x144logo"
      content="/mstile-144x144.png"
    />
    <meta
      name="msapplication-square150x150logo"
      content="/mstile-150x150.png"
    />
    <meta name="msapplication-wide310x150logo" content="/mstile-310x150.png" />
    <meta
      name="msapplication-square310x310logo"
      content="/mstile-310x310.png"
    />
  </Head>
);

export default Meta;
