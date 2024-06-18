import { Container } from 'reactstrap';
import styles from './styles.module.scss';

const CardSection = () => {
    return (
        <>
            <p className={styles.sectionTitle}>OS PRINCIPAIS GAMES DA ATUALIDADE</p>
            <Container className='d-flex flex-wrap justify-content-center gap-4 pb-5'>
                <div className={styles.card1}>
                    <p className={styles.cardTitle}></p>
                    <p className={styles.cardDescription}>
                    </p>
                </div>
                <div className={styles.card2}>
                    <p className={styles.cardTitle}></p>
                    <p className={styles.cardDescription}>
                    </p>
                </div>
                <div className={styles.card3}>
                    <p className={styles.cardTitle}></p>
                    <p className={styles.cardDescription}>
                    </p>
                </div>
                <div className={styles.card4}>
                    <p className={styles.cardTitle}></p>
                    <p className={styles.cardDescription}>   
                    </p>

                </div>
                <div className={styles.card5}>
                    <p className={styles.cardTitle}></p>
                    <p className={styles.cardDescription}>
                       
                    </p>
                </div>
                <div className={styles.card6}>
                    <p className={styles.cardTitle}>E muito mais...</p>
                    <p className={styles.cardDescription}>
                        Só aqui no portal Gamers News você encontra desde Copa Roblox até os principais competitivos do mundo do FPS.
                    </p>
                </div>
            </Container>
        </>
    )
}

export default CardSection;