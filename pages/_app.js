import "../styles/globals.css";
import "../styles/css2.css";
import Script from "next/script";
import * as gtag from "../helpers/gtag"
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return <>
    <Script
      strategy="afterInteractive"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=G-X51H7PBJ40`}
    />
    <Script
      id='google-analytics'
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
        
          gtag('config', 'G-X51H7PBJ40', {
            page_path: window.location.pathname,
          });
        `,
      }}
    />
    <Component {...pageProps} />;
  </>
}

export function reportWebVitals(metric) {
  console.log(metric);
}

export default MyApp;
