import styles from "./styles.module.scss"
import useSWR from "swr"
import gameService, { GameType } from "@/src/services/gameService"
import HeaderAuth from "../../common/headerAuth"
import { Button, Container } from "reactstrap"
import Link from "next/link"
import PageSpinner from "../../common/spinner"

const FeaturedSection = function () {
    const { data, error } = useSWR('/featured', gameService.getFeaturedGames)	
    if (error) return error
    if (!data) {
        return <PageSpinner />
    }
  

    return( <>
    {data.data?.map((game: GameType) => (
        <div style={{
            backgroundImage: `linear-gradient(to bottom, #6666661a, #151515), url(${process.env.NEXT_PUBLIC_BASEURL}/${game.thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
              height: "950px",
            }} key={game.id}>
            <HeaderAuth />
            <Container className="pt-4">
                <p className={styles.title}>Destaques do competitivo: {game.name}</p>
                <p className={styles.description}>{game.synopsis}</p>
                <Link style={{ textDecoration: "none" }} href={`/games/${game.id}`}>
                <Button outline color="light" className={styles.button}>
                    ACESSE AGORA!
                    <img src="/control.svg" alt="buttonImg" className={styles.buttonImg}/>
                </Button>
                </Link>
            </Container>
        </div>
    ))[0]}
    </>)
}

export default FeaturedSection