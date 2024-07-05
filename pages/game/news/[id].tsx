import { useRouter } from "next/router"
import styles from "../../../styles/newsPlayer.module.scss"
import Head from "next/head"
import HeaderGeneric from "@/src/components/common/headerGeneric"
import { useEffect, useRef, useState } from "react"
import gameService, { GameType } from "@/src/services/gameService"
import PageSpinner from "@/src/components/common/spinner"
import { Container } from "reactstrap"
import ReactPlayer from 'react-player/lazy'
import api from "@/src/services/api"
import Footer from "@/src/components/common/footer"
import watchVideoService from "@/src/services/newService"

const NewsPlayer = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [game, setGame] = useState<GameType>()
    const [isReady, setIsReady] = useState(false)
    const newOrder = parseFloat(router.query.id?.toString() || "")
    const newId = parseFloat(router.query.newid?.toString() || "")
    const gameId = router.query.gameId?.toString() || ""
    const [getNewTime, setGetNewTime] = useState(0)
    const [newTime, setNewTime] = useState(0)
    const playerRef = useRef<ReactPlayer>(null)


    const handleGetNewTime = async () => {
        const res = await watchVideoService.getWatchTime(newId)
        if (res.data !== null) {
            setGetNewTime(res.data.seconds)
        }
    }

    const handleSetNewTime = async () => {
        await watchVideoService.setWatchTime({
            newId: newId,
            seconds: newTime
        })

    }

    useEffect(() => {
        handleGetNewTime()
    }, [router])

    const handlePlayerTime = () => {
        playerRef.current?.seekTo(getNewTime)
        setIsReady(true)
    }

    if (isReady === true) {
        setTimeout(() => {
            handleSetNewTime()
        }, 1000 * 3)
    }

    const getGame = async function () {
        if (typeof gameId !== "string") return

        const res = await gameService.getNews(gameId)
        if (res.status === 200) {
            setGame(res.data)
        }
    }


    useEffect(() => {
        getGame()
    }, [gameId])

    useEffect(() =>{
        if(!sessionStorage.getItem('gamersnews-token')) {
            router.push("/login")
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <PageSpinner />
    }
    
    if (game?.news === undefined) return <PageSpinner />

    return (
        <>
            <Head>
                <title>{game.news[newOrder].name}</title>
                <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
                 <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <HeaderGeneric logoUrl="/home" btnContent={'Mais notícias'} btnUrl={`/game/${gameId}`} />
                <Container className="d-flex flex-column align-items-center gap-3 pt-5">
                    <p className={styles.gameTitle}>
                        {game.news[newOrder].name}
                    </p>
                    <p className="text-left py-md-4 py-2 fs-md-5 fs-6 fw-normal">{game.news[newOrder].textNews}</p>
                    {typeof window === 'undefined' ? null : (
                        <ReactPlayer className={styles.player}
                            url={`${process.env.NEXT_PUBLIC_BASEURL}/news/stream?videoUrl=${game.news[newOrder].videoUrl}&token=${sessionStorage.getItem("gamersnews-token")}`} controls config={{
                                file: {
                                    attributes: {
                                        crossOrigin: "true",
                                    }
                                }

                            }}
                        />
                    )}
                    <p className="fs-6 fw-light">Estamos melhorando cada vez mais a experiência do usuário 😊
                    </p>
                </Container>
                <Footer />
            </main>
        </>
    )
}

export default NewsPlayer
