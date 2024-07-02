import { useRouter } from "next/router"
import styles from "../../../styles/newsPlayer.module.scss"
import Head from "next/head"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { useEffect, useState } from "react"
import gameService, { GameType } from "@/src/services/gameService"
import PageSpinner from "@/src/components/common/spinner"
import { Container } from "reactstrap"
import ReactPlayer from "react-player"
import api from "@/src/services/api"
import Footer from "@/src/components/common/footer"

const NewsPlayer = () => {
    const router = useRouter()
    const [game, setGame] = useState<GameType>()
    const newOrder = parseFloat(router.query.id?.toString() || "")
    const gameId = router.query.gameId?.toString() || ""

    const getGame = async function () {
        if (typeof gameId !== "string") return

        const res = await gameService.getNews(gameId)
        if(res.status === 200) {
            setGame(res.data)
        }
    }

    useEffect(() => {
      getGame()
    }, [gameId])

    if (game?.news === undefined) return <PageSpinner/>

    return (
        <>
            <Head>
                <title>{game.news[newOrder].name}</title>
                <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
            </Head>
            <main>
            <HeaderGeneric logoUrl="/home" btnContent={'Mais notícias'} btnUrl={`/game/${gameId}`}/>
            <Container className="d-flex flex-column align-items-center gap-3 pt-5">
                <p className={styles.gameTitle}>
                    {game.news[newOrder].name}
                </p>
                <p className="text-left py-4 fs-5 fw-normal">{game.news[newOrder].textNews}</p>
                {typeof window === 'undefined' ? null :(
                    <ReactPlayer className={styles.player} 
                    url={`${process.env.NEXT_PUBLIC_BASEURL}/news/stream?videoUrl=${game.news[newOrder].videoUrl}&token=${sessionStorage.getItem("gamersnews-token")}`} controls/>
                )}
                <p className="fs-6 fw-light">Estamos melhorando cada vez mais a experiência do usuário 😊
                </p>
            </Container>
            <Footer/>
            </main>
        </>
    )
}

export default NewsPlayer