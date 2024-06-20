import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import gameService from "@/src/services/gameService";
import { GetStaticProps } from "next";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { ReactNode, useEffect } from "react";
import { GameType } from "@/src/services/gameService";
import Footer from "@/src/components/common/footer";
import Aos from "aos";
import "aos/dist/aos.css";

interface indexPageProps {
  children?: ReactNode;
  game: GameType[];
}

const HomeNoAuth = ({game}: indexPageProps) => {

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Head>
        <title>Gamers News</title>
        <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
        <meta property="og:title" content="Gamers News" key="title" />
        <meta name="description" content="Tenha acesso as melhores notícias de games atuais!" />
      </Head>
      <main>
        <div className={styles.sectionBackground} data-aos="fade-zoom-in" data-aos-duration="1600">
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <div data-aos="fade-right" data-aos-duration="1500">
        <CardSection /> 
        </div>
        <div data-aos="fade-up" data-aos-duration="1350">
        <SlideSection newestGames={game}/>
        </div>
        <Footer/>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await gameService.getNewestGames();
  return {
    props: {
      game: res.data
    }, 
    revalidate: 3600 * 24   // 24 hours
  }
}

export default HomeNoAuth;