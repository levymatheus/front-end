import styles from './styles.module.scss';
import { GameType } from '@/src/services/gameService';

interface props {
    game: GameType;
}

const SlideCard = function ({game}: props) {
    return <>
    <div className={styles.slide}>
        <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${game.thumbnailUrl}`} alt={game.name} className={styles.slideImg}/>
        <p className={styles.slideTitle}>{game.name}</p>
        <p className={styles.slideDescription}>{game.synopsis}</p>
    </div>
    </>
}

export default SlideCard;