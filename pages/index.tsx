import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Header } from '../src/components/Header';
import { Schedule } from '../src/components/Schedule';
import { Footer } from '../src/components/Footer';
import { Button } from '../src/ui-kit/Button';
import { useRouter } from 'next/router';
import coverImage from '../public/images/composition3.png';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { pageContainer, main, imageContainer, cover, titleContainer, title, subTitle } = styles;

  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  useEffect(() => {
    setInnerWidth(window.innerWidth);
  }, []);

  return (
    <div className={pageContainer}>
      <Header />

      <main className={main}>
        <section className={cover}>
          <div className={imageContainer}>
            <Image
              src={coverImage}
              alt='Intensive dance weekend with Ekaterina Oleynikova and Polina Ostrovska in Warsaw'
              fill
              priority
            />
          </div>
          <div className={titleContainer}>
            <h1 className={title}>{t('h1')}</h1>
            <h2 className={subTitle}>{t('h2')}</h2>
            <Button
              type='button'
              onClick={() => router.push('/signup')}
              variant={innerWidth > 1023 ? 'light' : 'dark'}
            >
              {t('button')}
            </Button>
          </div>
        </section>

        <Schedule />

        <Footer />
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default Home;
