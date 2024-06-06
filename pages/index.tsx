import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";
import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";

const HomeNoAuth = () => {
  return (
    <>
    <Head>
      <title>Gamers News</title>     
      <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      <meta property="og:title" content="Gamers News" key="title" />
      <meta name="description" content="Tenha acesso as melhores notícias de games atuais!" />
    </Head>
    <main>
      <HeaderNoAuth/>
    </main>
    </>
  );
  
}

export default HomeNoAuth;