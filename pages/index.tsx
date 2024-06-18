import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import gameService from "@/src/services/gameService";
import { GetStaticProps } from "next";
import SlideSection from "@/src/components/homeNoAuth/slideSection";
import { ReactNode } from "react";
import { GameType } from "@/src/services/gameService";

interface indexPageProps {
  children?: ReactNode;
  game: GameType[];
}

const HomeNoAuth = ({game}: indexPageProps) => {
  return (
    <>
      <Head>
        <title>Gamers News</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
        <meta property="og:title" content="Gamers News" key="title" />
        <meta name="description" content="Tenha acesso as melhores notícias de games atuais!" />
      </Head>
      <main>
        <div className={styles.sectionBackground}>
          <HeaderNoAuth />
          <PresentationSection />
        </div>
        <CardSection /> 
        <SlideSection newestGames={game} />
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