import { FaPlay } from 'react-icons/fa'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { Button, Heading, Image, Text } from '../ui'
import { useEffect, useState } from 'react'
import { getHotMovies, getMovieDetail } from '@/services/MovieService'
import { Movie } from '@/@types/movie'

const BannerMovie = () => {
  const [hotMovies, setHotMovies] = useState<Movie | null>(null)

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    try {
      const hotMovies = await getHotMovies()
      const firstMovie = hotMovies?.[0]
      const movieInfo = await getMovieDetail({ slug: firstMovie.slug })
      setHotMovies(movieInfo)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="relative inset-0 hidden md:block">
      <div className="relative left-0 right-0 top-0 mb-[20px] touch-pan-y select-none pb-[40%]">
        <div className="absolute inset-0 h-[56.25vw] w-full">
          <Image
            src={`https://img.ophim.live/uploads/movies/${hotMovies?.poster_url}`}
            className="w-full bg-cover bg-center"
          />
          <div
            style={{
              background:
                'linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)',
            }}
            className="opacity-1 absolute bottom-0 left-0 right-[26.09%] top-0 z-10 transition-opacity duration-500"
          ></div>
          <div
            style={{
              background:
                'linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)',
              backgroundPosition: '0 top',
              backgroundSize: '100% 100%',
            }}
            className="absolute -bottom-[1px] left-0 right-0 top-auto z-10 h-[14.7vw] w-full bg-repeat-x"
          ></div>
          <div className="absolute inset-0 h-full w-full">
            <div className="absolute bottom-[30%] left-[4%] top-0 z-20 flex w-[90%] flex-col justify-end xl:w-[36%] xxl:left-8">
              <Heading
                as="h1"
                className="select-none whitespace-nowrap py-4 text-[40px] leading-10 lg:py-8"
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,.45)',
                }}
                bold
              >
                {hotMovies?.name}
              </Heading>
              {hotMovies?.content && (
                <Text
                  size="xl"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,.45)',
                  }}
                  className="hidden select-none leading-normal md:block"
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: hotMovies?.content?.slice(0, 200) + '...',
                    }}
                  ></p>
                </Text>
              )}
              <div className="mt-md flex items-center gap-md lg:mt-xl">
                <Button
                  className="px-4 py-5"
                  variant="white"
                  before={<FaPlay className="mr-1" size={20} />}
                >
                  <Text size="xl">Phát</Text>
                </Button>
                <Button
                  variant="secondary"
                  className="px-4 py-5"
                  before={
                    <IoInformationCircleOutline className="mr-1" size={26} />
                  }
                >
                  <Text size="xl" className="whitespace-nowrap">
                    Thông tin khác
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerMovie
