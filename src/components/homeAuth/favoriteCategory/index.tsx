import useSWR from "swr"
import styles from "../../../../styles/slideCategory.module.scss"
import gameService from "@/src/services/gameService"
import SlideComponent from "../../common/slideComponent"

const FavoriteCategory = function () {
    const { data, error } = useSWR('/favorites', gameService.getFavGames)	
    if (error) return error
    if (!data) 
    return (
    <>
    <p>Loading...</p>
    </>)

    return <>
    <p className={styles.titleCategory}>Meus jogos favoritos</p>
    {data.data.games.length >= 1 ? (<SlideComponent game={data.data.games}/>)
    :
    (
        <p className="text-center pt-3 h5">
            <strong>Sem jogos favoritos</strong>
        </p>
    )}
    </>
}

export default FavoriteCategory