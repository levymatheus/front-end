import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gameService, { GameType } from "@/src/services/gameService";

const Search = () => {
    const router = useRouter()
    const searchName:any = router.query.name
    const [searchResult, setSearchResult] = useState<GameType[]>([])

    const searchGames = async () => {
        const res = await gameService.getSearch(searchName)
        setSearchResult(res.data.games)
    }

    useEffect(() => {
        searchGames()
    }, [searchName])

    return (
        <>
            <Head>
                <title>Gamers News - {searchName}</title>
                <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
            </Head>
            <main>
                <HeaderAuth />
              {searchResult?.map((game) => (
                <div key={game.id}>
                    <p>{game.name}</p>
                </div>
              ))}
            </main>
        </>
    );
};

export default Search;