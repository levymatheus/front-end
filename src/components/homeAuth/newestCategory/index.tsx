import gameService from "@/src/services/gameService";
import useSWR from "swr";
import SlideComponent from "../../common/slideComponent";
import styles from "../../../../styles/slideCategory.module.scss";

const NewestCategory = function () {
    const { data, error } = useSWR('/newest', gameService.getNewestGames)	
    if (error) return error
    if (!data) 
    return (
    <>
    <p>Loading...</p>
    </>)

  return (
   <>
   <p className={styles.titleCategory}>LANÇAMENTOS DE SETEMBRO</p>
   <SlideComponent game={data.data}/>
   </>
  );
};

export default NewestCategory;