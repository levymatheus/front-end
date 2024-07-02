import styles from '../../styles/gamePage.module.scss';
import Head from 'next/head';
import HeaderAuth from '@/src/components/common/headerAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import gameService, { GameType } from '@/src/services/gameService';
import { Button, Container } from 'reactstrap';
import PageSpinner from '@/src/components/common/spinner';
import NewsList from '@/src/components/newsList';
import Footer from '@/src/components/common/footer';

const GamePage = () => {
    const [game, setGame] = useState<GameType>()
    const [liked, setLiked] = useState<boolean>(false)  
    const [favorited, setFavorited] = useState(false)
    const router = useRouter()
    const { id } = router.query

    const getGame = async () => {
        if (typeof id !== 'string') return
        const res = await gameService.getNews(id)
        if (res.status === 200) {
            setGame(res.data)
            setLiked(res.data.liked);
            setFavorited(res.data.favorited)
        }
    }

    useEffect(() => {
        if (id) {
            getGame()
        }
    }, [id])


    const handleLikeGame = async () => {
        if (typeof id !== 'string') return
        if (liked === false) {
            await gameService.like(id);
            setLiked(true);
        } else {
            await gameService.removeLike(id);
            setLiked(false);
        }
    };

    const handleFavGame = async () => {
        if (typeof id !== 'string') return
        if (favorited === false) {
            await gameService.addToFav(id);
            setFavorited(true);
        } else {
            await gameService.removefav(id);
            setFavorited(false);
        }
    };

    if(game === undefined) return <PageSpinner />


    return (
        <>
            <Head>
                <title>Gamers News - {game?.name}</title>
                <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
            </Head>
            <main>
                <div style={{
                    backgroundImage: `linear-gradient(to bottom, #6666661a -45% , #151515 74% ), url(${process.env.NEXT_PUBLIC_BASEURL}/${game?.thumbnailUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "970px"
                }}>
                    <HeaderAuth />
                </div>
                <Container className={styles.gameInfo}>
                    <p className={styles.gameTitle}>{game?.name}</p>
                    <p className={styles.gameDescription}>{game?.synopsis}</p>
                    <Button outline className={styles.gameBtn} disabled={game?.news?.length === 0 ? true : false}>
                        ACESSE AGORA!
                        <img src='/control.svg' alt='control' className={styles.buttonImg} />
                    </Button>
                    <div className={styles.interactions}>
                        {liked === undefined ? (
                            <img
                                src="/game/iconLike.svg"
                                alt="likedImage"
                                className={styles.interactionImages}
                                onClick={handleLikeGame}
                            />
                        ) : (
                            <img
                                src="/game/iconLiked.svg"
                                alt="likeImage"
                                className={styles.interactionImages}
                                onClick={handleLikeGame}
                            />
                        )}
                        {favorited === undefined ? (
                            <img

                                src="/game/iconAddFav.svg"
                                alt="addFav"
                                className={styles.interactionImages}
                                onClick={handleFavGame}
                            />
                        ) : (
                            <img

                                src="/game/iconFavorited.svg"
                                alt="favorited"
                                className={styles.interactionImages}
                                onClick={handleFavGame}
                            />
                        )}
                    </div>
                </Container>
                <Container className={styles.newsInfo}>
                    <p className={styles.newsDivision}>NOTÍCIAS</p>
                    <p className={styles.newsLenght}>{game?.news?.length} notícias 
                    </p>
                    {game?.news?.length === 0 ?(
                        <p>
                            <strong>Jogo sem notícias até o momento!⌛</strong>
                        </p>
                    ): game?.news?.map((news) => (
                        <NewsList key={news.id} news={news} game={game} />    
                     ))}
                </Container>
                <Footer/>
            </main>
        </>
    )
}

export default GamePage;