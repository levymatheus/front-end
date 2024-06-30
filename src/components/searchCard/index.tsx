import { GameType } from '@/src/services/gameService'
import styles from './styles.module.scss'
import Link from 'next/link'

interface props {
    game: GameType
}

const SearchCard = ({ game }: props ) => {
    return( 
    <>
    <Link style={{textDecoration: "none"}} href={`/games/${game.id}`} >
        <div className={styles.searchCard}>
            <img src={`${process.env.NEXT_PUBLIC_BASEURL}/${game.thumbnailUrl}`} alt={game.name} className={styles.searchCardImg} />
            <p  className={styles.searchCardTitle}>{game.name}</p>
            <p className={styles.searchCardDescription}>{game.synopsis}</p>
        </div>
    </Link>
    </>
    )
}

export default SearchCard