import CategoriesService from "@/src/services/categoriesService"
import styles from "../../../../styles/slideCategory.module.scss"
import useSWR from "swr"
import SlideComponent from "../../common/slideComponent"

interface props {
    categoryId: number
    categoryName: string
}

const ListCategoriesSlide = ({categoryId, categoryName}: props) => {
    const { data, error } = useSWR(`/categoriesGames/${categoryId}`, () => CategoriesService.getGames(categoryId))	
    if (error) return error
    if (!data) 
    return (
    <>
    <p>Loading...</p>
    </>)

 return <>
    <p className={styles.titleCategory}>{categoryName}</p>
 <SlideComponent game={data.data.games} />
 </>
}

export default ListCategoriesSlide