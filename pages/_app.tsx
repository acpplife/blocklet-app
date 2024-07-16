import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { ProfileProvider } from '../sections/contexts/profile';
import '../styles/globals.css';

interface MyAppProps extends AppProps {
  Component: NextPage;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>blocklet-app</title>
        <link rel="icon" href="/favicon.ico?imageFilter=convert&f=png&w=32" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F6AF5" />
      </Head>
      <Script src="__blocklet__.js" />
      <ProfileProvider>{getLayout(<Component {...pageProps} />)}</ProfileProvider>
    </>
  );
}

export default MyApp;
