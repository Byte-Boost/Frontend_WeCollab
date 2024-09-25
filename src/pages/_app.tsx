import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavbar = router.pathname !== '/';

  return (
    <Layout showNavbar={showNavbar}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;