import { GameType } from '@/src/services/gameService';
import styles from './styles.module.scss';
import SlideComponent from '@/src/components/common/slideComponent';
import { Button, Container } from 'reactstrap';
import Link from 'next/link';

interface props {
    newestGames: GameType[]
}

const SlideSection = function({newestGames}: props) {
    return <>
    <Container className="d-flex flex-column align-items-center py-4">
        <p className={styles.sectionTitle} >JOGOS JÁ DISPONÍVEIS</p>
        <SlideComponent game={newestGames}/>
        <Link href='/register'>
        <Button  className={styles.slideSectionBtn}>Se cadastre para acessar as notícias!</Button>
        </Link>
    </Container>
    </>
}

export default SlideSection;