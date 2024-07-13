import Head from "next/head";
import styles from "../styles/HomeNoAuth.module.scss";



const MaintenancePage = () => {
  return (
    <>
      <Head>
        <title>Site em Manutenção</title>
        <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
        <meta property="og:title" content="Site em Manutenção" key="title" />
        <meta name="description" content="Estamos trabalhando para melhorar nosso site. Voltaremos em breve!" />
      </Head>
      <main className={styles.maintenanceContainer}>
        <h1>Estamos em Manutenção</h1>
        <p>Desculpe pelo transtorno. Estamos trabalhando para melhorar nosso site e voltaremos em breve!</p>
        <div className={styles.maintenanceImage}>
          <img src="/web-maintenance.png"alt="Manutenção" />
        </div>
        <div className={styles.maintenanceImage}>
        <img src="/gamersNews.png" alt="Logo" />   
        </div>
        <p>Entre em contado com os desenvolvedores em caso de dúvida:</p>
        <p>https://www.instagram.com/levymattheeus/ ou https://www.instagram.com/djandredantas/</p>
      </main>
    </>
  );
}

export default MaintenancePage;
