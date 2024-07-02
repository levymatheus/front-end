import { GameType, newType } from '@/src/services/gameService'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

interface props {
    news: newType
    game: GameType
}

const NewsList = function ({news, game}: props) {
    const router = useRouter()

    const handleSecondsToMin = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        function toString(num: number) {
            return num.toString().padStart(2, '0');
        }

        const result = `${toString(minutes)}:${toString(seconds)}`;
        return result;
    }

    const handleNewsPlayer = () => {
        router.push(`/game/news/${news.order - 1}?gameId=${game.id}&newId=${news.id}`)
    }

    return (
        <>
        <div className={styles.newCard} onClick={handleNewsPlayer}>
            <div className={styles.newOrderTime}>
            <p className={styles.newOrder}>Notícia N° {news.order}</p>
            <p className={styles.newTime}>{handleSecondsToMin(news.secondsLong)}</p>
            </div>
            <div className={styles.newTitleDescription}>
            <p className={styles.newTitle}>{news.name}</p>
            <p className={styles.newDescription}>{news.textNews}</p>
            </div>
        </div>
        </>)

}

export default NewsList