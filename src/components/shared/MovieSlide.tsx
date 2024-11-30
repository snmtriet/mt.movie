import { Movie } from '@/@types/movie'
import { setModalMovie, useAppDispatch } from '@/store'
import { cn } from '@/utils'
import { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NavigationOptions, SwiperModule } from 'swiper/types'
import { useWindowSize } from 'usehooks-ts'
import { Image, Text } from '../ui'
import Card from './Card'

type Props = {
  showIndex?: boolean
  slidesPerView?: number | 'auto'
  movies: Movie[]
  navigation?: NavigationOptions | boolean
}

const MovieSlide = (props: Props) => {
  const { slidesPerView, movies, navigation } = props
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const [isSlideChange, setIsSlideChange] = useState(false)
  const modules = [Navigation].filter(Boolean) as SwiperModule[]

  const handleOpenMovie = (movie: Movie) => {
    dispatch(
      setModalMovie({
        open: true,
        slug: movie.slug,
      }),
    )
  }

  return (
    <div
      className={cn('relative w-full transition-all md:ml-8', {
        'md:ml-0': isSlideChange,
      })}
    >
      <Swiper
        modules={modules}
        spaceBetween={10}
        slidesPerView={slidesPerView || 6.2}
        slidesPerGroup={1}
        navigation={navigation}
        onSlideChange={(e) => {
          !isSlideChange && e.activeIndex !== 0 && setIsSlideChange(true)
        }}
        loop={movies.length > 6}
        speed={400}
        grabCursor
        allowTouchMove={width < 768 ? true : false}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.2,
          },
          992: {
            slidesPerView: 3.2,
          },
          1300: {
            slidesPerView: 4.2,
          },
          1440: {
            slidesPerView: 4.2,
          },
          1920: {
            slidesPerView: 5.2,
          },
          2240: {
            slidesPerView: 6.2,
          },
        }}
      >
        {movies.length
          ? movies.map((item) => (
              <SwiperSlide
                key={item._id}
                className="cursor-pointer"
                onClick={() => handleOpenMovie(item)}
              >
                <Card
                  className="group relative select-none overflow-hidden p-0 transition-all duration-150 hover:bg-dark-5"
                  border={false}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src={`https://img.ophim.live/uploads/movies/${item.poster_url}`}
                      className="aspect-video h-full w-full object-cover transition-all duration-150 group-hover:scale-110"
                    />
                    <div className="absolute right-0 top-0 rounded-bl bg-red-700 p-1 shadow-lg">
                      <Text size="sm" bold>
                        {item.episode_current}
                      </Text>
                    </div>
                    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center rounded shadow-lg">
                      <Text
                        size="sm"
                        bold
                        className="rounded-tl bg-red-700 px-2 py-1"
                      >
                        {item.quality}
                      </Text>
                      <Text
                        size="sm"
                        bold
                        className="rounded-tr bg-white p-1 px-2 py-1 text-dark"
                      >
                        {item.lang}
                      </Text>
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <Text ellipsis className="text-red-700" bold>
                      {item.origin_name}
                    </Text>
                    <Text ellipsis bold>
                      {item.name}
                    </Text>
                  </div>
                </Card>
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  )
}

export default MovieSlide
