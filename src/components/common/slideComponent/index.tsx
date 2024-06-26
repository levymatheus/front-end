//@ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { GameType } from '@/src/services/gameService';
import SlideCard from '@/src/components/common/slideCard';

interface props {
  game: GameType[]

}

const SlideComponent = function ({ game }: props) {
  let slideCount = 0

  if (game.length > 6) {
    slideCount = 6
  } else if (game) {
    slideCount = game.length
  }

  return <>
    <div className='d-flex flex-column align-items-center py-4'>
      <Splide options={{
        type: "loop",
        perPage: slideCount,
        perMove: 1,
        width: slideCount * 300,
        pagination: false,
        arrows: game.length > 6 ? true : false,
        drag: game.length > 6 ? true : false,
        breakpoints: {
          1350: {
            perPage: slideCount >= 2 ? 2 : 1,
            width: slideCount >= 2 ? 600 : 300,
            arrows: game.length > 2 ? true : false,
            drag: game.length > 2 ? true : false,
          },
          600: {
            perPage: 1,
            width: 300,
            arrows: game.length > 1 ? true : false,
            drag: game.length > 1 ? true : false,
          },
          300: {
            width: 250,
          }
        },
      }}>
        {game?.map((game) => (
          <SplideSlide key={game.id} >
            {<SlideCard game={game} />}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  </>;
}

export default SlideComponent;