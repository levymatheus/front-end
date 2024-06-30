import styles from "../styles/search.module.scss";
import Head from "next/head";
import HeaderAuth from "@/src/components/common/headerAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import gameService, { GameType } from "@/src/services/gameService";
import { Container } from "reactstrap";
import SearchCard from "@/src/components/searchCard";
import Footer from "@/src/components/common/footer";

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
            <main className={styles.main}>
                <div className={styles.headerFooterBg}>
                    <HeaderAuth />
                </div>
                {searchResult.length >= 1 ? (
                    <div className={styles.searchResult}>
                        <Container className="d-flex flex-wrap justify-content-center gap-5 py-4">
                        {searchResult?.map((game)=> ( 
                            <SearchCard key={game.id} game={game} />
                        ))}
                    </Container>
                    </div>
                    
            ):( <div className={styles.searchResult}><p className={styles.noSearchResult} >Nenhum jogo encontrado</p></div>)}
            
             <div className={styles.headerFooterBg}>
                    <Footer/>
                </div>
            </main>
        </>
    );
};

export default Search;