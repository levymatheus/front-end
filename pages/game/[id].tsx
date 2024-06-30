import styles from '../../styles/gamePage.module.scss';
import Head from 'next/head';
import HeaderAuth from '@/src/components/common/headerAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import gameService, { GameType } from '@/src/services/gameService';

const GamePage = () => {
    const [game, setGame] = useState<GameType>()
    const router = useRouter()
    const { id } = router.query

   const getGame = async () => {
    if (typeof id !== 'string') return
        const res = await gameService.getNews(id)
        if (res.status === 200) {
            setGame(res.data)
        }
   }

    useEffect(() => {
         getGame()
    }, [id])



    return (
        <>
        <Head>
            <title>Gamers News - {game?.name}</title>
            <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
        </Head>
        <main>
            <HeaderAuth />
            <p>{game?.name}</p>
        </main>
        </>
    ) 
}

export default GamePage;