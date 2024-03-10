import type { GetStaticProps, NextPage } from 'next';
import { getServerLocales, TolgeeNextProvider } from '../tolgeeNext';
import MainPage from '../views/page';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      locales: await getServerLocales(context.locale),
    },
  };
};

const Home: NextPage<{ locales: any }> = ({ locales }) => {
  return (
    <TolgeeNextProvider locales={locales}>
      <MainPage/>
    </TolgeeNextProvider>
  );
};

export default Home;