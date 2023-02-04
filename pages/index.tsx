import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Home.module.css';
import { Header } from '../src/components/Header';
import { Schedule } from '../src/components/Schedule';
import { Footer } from '../src/components/Footer';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { FormPopup } from '../src/components/FormPopup';
import Image from 'next/image';
import coverImage from '../public/images/composition3.png';

const Home: NextPage = () => {
  const { t } = useTranslation();
  const {
    pageContainer,
    main,
    imageContainer,
    cover,
    titleContainer,
    title,
    subTitle,
    signupButton,
  } = styles;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleVh = () => {
    if (typeof window != 'undefined') {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  };

  handleVh();

  return (
    <div className={pageContainer}>
      <Head>
        <title>
          Intensive dance weekend with Ekaterina Oleynikova and Polina Ostrovska in Warsaw
        </title>
      </Head>
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
            <button className={signupButton} type='button' onClick={openPopup}>
              {t('button')}
            </button>
          </div>
        </section>
        <Schedule />
        <Footer />
        {isPopupOpen ? <FormPopup onClose={closePopup} /> : <></>}
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
