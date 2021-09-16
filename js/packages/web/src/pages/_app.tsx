import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/index.less';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TW Digital Art NFT Marketplace</title>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F9E81HYMV3"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F9E81HYMV3');
        </script>
      </Head>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </>
  );
}
