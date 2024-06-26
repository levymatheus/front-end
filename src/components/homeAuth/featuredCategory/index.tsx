import useSWR from 'swr'
import styles from '../../../../styles/slideCategory.module.scss'
import gameService from '@/src/services/gameService'
import SlideComponent from '../../common/slideComponent'

const FeaturedCategory = () => {
    const { data, error } = useSWR('/featured', gameService.getFeaturedGames)	
    if (error) return error
    if (!data) 
    return (
    <>
    <p>Loading...</p>
    </>)
    return <>
    <p className={styles.titleCategory}>EM DESTAQUE</p>
    <SlideComponent game={data.data} />
    </>
}

export default FeaturedCategory