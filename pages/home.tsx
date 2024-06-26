import FavoriteCategory from "@/src/components/homeAuth/favoriteCategory"
import FeaturedCategory from "@/src/components/homeAuth/featuredCategory"
import FeaturedSection from "@/src/components/homeAuth/featuredSection"
import ListCategories from "@/src/components/homeAuth/listCategories"
import NewestCategory from "@/src/components/homeAuth/newestCategory"
import Head from "next/head"


const homeAuth = function () {
    return (
        <>
    <Head>
    <link rel="shortcut icon" href="/favicon_io/favicon.ico" type="image/x-icon" />
    <title>Gamers News - Home</title>
    </Head>
    <main>
      <FeaturedSection />
      <NewestCategory />
      <FavoriteCategory />
      <FeaturedCategory />
      <ListCategories />
    </main>
        </>
    )
}


export default homeAuth