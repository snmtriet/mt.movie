import { Movie } from '@/@types/movie'
import { getMovieByCategory, getMovieDetail } from '@/services/MovieService'
import { setModalMovie, useAppDispatch, useAppSelector } from '@/store'
import { useEffect, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BsPlusLg } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button, Heading, Image, Modal, Text } from '../ui'
import Card from './Card'
import Loading from './Loading'

const ModalMovie = () => {
  const { open, slug } = useAppSelector((state) => state.movie.modalMovie)
  const dispatch = useAppDispatch()
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMovies()

    return () => {
      setMovieInfo(null)
      setMovies([])
    }
  }, [slug])

  async function fetchMovies() {
    if (!slug) return
    try {
      setLoading(true)
      const movieInfo = await getMovieDetail({ slug })
      setMovieInfo(movieInfo)
      const indexRandom = Math.floor(Math.random() * movieInfo.category?.length)
      const randomCategorySlug = movieInfo.category?.[indexRandom]?.name
      const movies = await getMovieByCategory({
        slug: randomCategorySlug,
      })
      setMovies(movies)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  function handleClose() {
    dispatch(
      setModalMovie({
        open: false,
      }),
    )
  }

  const renderActors = (isShowAll?: boolean) => {
    if (!movieInfo?.actor) return null
    return (
      movieInfo.actor.length > 4
        ? [...movieInfo.actor, !isShowAll && 'more']
            .filter(Boolean)
            .slice(isShowAll ? 0 : -4)
        : movieInfo.actor
    ).map((actor, index) => (
      <Text key={index} className="text-white/60">
        <Link
          to="#"
          className="text-white hover:underline"
          onClick={(e) => {
            if (actor === 'more') {
              e.preventDefault()
              const aboutSection = document.getElementById('about-movie-info')
              aboutSection?.scrollIntoView()
            }
          }}
        >
          {actor}
        </Link>
        {index !== movieInfo.actor!.length - 1 && actor !== 'more' && (
          <span className="mr-1">, </span>
        )}
      </Text>
    ))
  }

  const renderGenres = () => {
    if (!movieInfo?.category) return null
    return movieInfo.category.map((genre, index) => (
      <Text key={index} className="text-white/60">
        <Link to="#" className="text-white hover:underline">
          {genre.name}
        </Link>
        {index !== movieInfo.category!.length - 1 && (
          <span className="mr-1">, </span>
        )}
      </Text>
    ))
  }

  const renderCountry = () => {
    if (!movieInfo?.country) return null
    return movieInfo.country.map((country, index) => (
      <Text key={index} className="text-white/60">
        <Link to="#" className="text-white hover:underline">
          {country.name}
        </Link>
        {index !== movieInfo.country!.length - 1 && (
          <span className="mr-1">, </span>
        )}
      </Text>
    ))
  }

  const renderDirectors = () => {
    if (!movieInfo?.director) return null
    return movieInfo.director.map((director, index) => (
      <Text key={index} className="text-white/60">
        <Link to="#" className="text-white hover:underline">
          {director}
        </Link>
        {index !== movieInfo.director!.length - 1 && (
          <span className="mr-1">, </span>
        )}
      </Text>
    ))
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onRequestClose={handleClose}
      className="h-screen overflow-y-scroll"
    >
      <Loading loading={loading} spinnerClass="w-70 h-70">
        <div className="relative h-full w-full bg-black">
          <img
            src={`https://img.ophim.live/uploads/movies/${movieInfo?.poster_url}`}
            alt=""
            className="h-full w-full"
          />
          <div
            className="absolute top-0 h-full w-full"
            style={{
              background: 'linear-gradient(0deg,#181818,transparent 50%)',
            }}
          >
            <div className="absolute bottom-[5%] left-2 w-full md:left-12 md:w-[40%]">
              <Heading
                as="h1"
                className="select-none hyphens-auto pb-1 leading-8"
                bold
              >
                {movieInfo?.name}
              </Heading>
              <Heading
                as="h3"
                className="mb-3 select-none leading-8 text-white/60"
                bold
              >
                ({movieInfo?.origin_name})
              </Heading>
              <div className="flex items-center gap-md">
                <Button
                  className="md:px-6 md:py-5"
                  variant="white"
                  before={<FaPlay className="mr-2" size={20} />}
                >
                  <Text size="xl">Phát</Text>
                </Button>
                <Button className="group h-[36px] w-[36px] rounded-full border !bg-dark-3/60 hover:border-red-700 md:h-50 md:w-50">
                  <BsPlusLg
                    size={26}
                    strokeWidth={0.3}
                    className="text-white transition-colors group-hover:text-red-700"
                  />
                </Button>
                <Button className="group h-[36px] w-[36px] rounded-full border !bg-dark-3/60 hover:border-red-700 md:h-50 md:w-50">
                  <AiOutlineLike
                    size={26}
                    strokeWidth={0.3}
                    className="text-white transition-colors group-hover:text-red-700"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full bg-dark">
          <div className="px-2 md:px-8">
            <div className="my-2 flex flex-col items-start justify-between gap-xl lg:flex-row">
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: movieInfo?.content || '',
                  }}
                ></div>
                {movieInfo?.episodes?.[0]?.server_data &&
                  movieInfo?.episodes?.[0]?.server_data?.length > 1 && (
                    <div className="pb-8">
                      <Heading as="h2" className="my-4">
                        Tập phim
                      </Heading>
                      <div className="flex flex-wrap gap-md">
                        {movieInfo?.episodes[0].server_data?.map(
                          (episode, index) => (
                            <button
                              key={index}
                              className="h-10 min-w-10 whitespace-nowrap rounded bg-red-800 transition-colors hover:bg-red-700"
                            >
                              {episode.name?.split('(')?.[0]?.trim()}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
              <div className="flex flex-shrink-0 flex-col lg:min-w-[300px]">
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Diễn viên:</Text>
                  {renderActors()}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Thể loại:</Text>
                  {renderGenres()}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Quốc gia:</Text>
                  {renderCountry()}
                </div>
              </div>
            </div>
            <div className="my-4">
              <Heading as="h2" className="my-4">
                Có thể bạn sẽ thích
              </Heading>
              <div className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3">
                {movies &&
                  movies.length > 0 &&
                  movies.map((item, index) => (
                    <Card key={index} className="group cursor-pointer p-0">
                      <div className="relative w-full overflow-hidden">
                        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex items-center justify-center rounded-full border p-2">
                            <FaPlay size={28} />
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 z-10 rounded-bl bg-red-700 p-1 shadow-lg">
                          <Text size="sm" bold>
                            {item.lang}
                          </Text>
                        </div>
                        <Image
                          src={`https://img.ophim.live/uploads/movies/${item?.poster_url}`}
                          className="h-full w-full object-cover transition-transform duration-150 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-2">
                        <div className="mb-1 flex items-center gap-md">
                          <Text ellipsis className="text-red-700" bold>
                            {item.origin_name}
                          </Text>
                          <div className="rounded border px-1">
                            {item.quality}
                          </div>
                          <Text>{item.year}</Text>
                        </div>
                        <Text ellipsis bold>
                          {item.name}
                        </Text>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
            <hr className="bg-dark/60" />
            <div className="mt-6" id="about-movie-info">
              <Heading as="h2" className="my-4">
                <strong>{movieInfo?.name}</strong>
              </Heading>
              <div className="flex flex-shrink-0 flex-col lg:min-w-[300px]">
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Đạo diễn:</Text>
                  {renderDirectors()}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Diễn viên:</Text>
                  {renderActors(true)}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Thể loại:</Text>
                  {renderGenres()}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Quốc gia:</Text>
                  {renderCountry()}
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Năm:</Text>
                  <Text>{movieInfo?.year}</Text>
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Cập nhật:</Text>
                  <Text>{movieInfo?.episode_current}</Text>
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Chất lượng:</Text>
                  <Text>
                    {movieInfo?.quality} + {movieInfo?.lang}
                  </Text>
                </div>
                <div className="my-1 flex items-center break-words">
                  <Text className="mr-1 text-white/60">Thời lượng:</Text>
                  <Text>{movieInfo?.time}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Loading>
    </Modal>
  )
}

export default ModalMovie
