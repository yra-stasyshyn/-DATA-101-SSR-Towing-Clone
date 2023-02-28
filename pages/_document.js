import Document, { Html, Head, Main, NextScript } from "next/document";

const MyDocument = (props = {}) => {
  const { faviconImage, BASE_URL } = props;
  // const images = JSON.parse(
  //   fs.readFileSync(`${process.cwd()}/json/images.json`, { encoding: "utf-8" })
  // );
  // const faviconImage = images.find((image) => image.tagName === "favicon-32");
  // const BASE_URL = process.env.BASE_UR;
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#97040c" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.IMAGE_PATH}${BASE_URL}/${faviconImage?.imageName}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.IMAGE_PATH}${BASE_URL}/${faviconImage?.imageName}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.IMAGE_PATH}${BASE_URL}/${faviconImage?.imageName}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  const { req } = ctx;

  console.log('============ req.headers', req.headers);

  if (!process.browser) {
    const BASE_URL =
      req.headers["x-forwarded-host"].indexOf("amplifyapp.com") > 0
        ? 'riversidetowing.us'
        : req.headers["x-forwarded-host"]
          ?.replace('https://', '')
          .replace('http://', '')
          .replace('www.', '');
    if (!BASE_URL) {
      return initialProps;
    }
    const imagesResponse = await fetch(`${process.env.API_URL}/api/template-images/domain?domain=${BASE_URL}`);
    const images = await imagesResponse.json();
    const faviconImage = images.find((image) => image.tagName === 'favicon-32');

    return { ...initialProps, faviconImage, BASE_URL };
  }

  return initialProps;
};

export default MyDocument;