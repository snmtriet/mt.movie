import { Movie, ServerDaum } from '@/@types/movie'
import { Loading } from '@/components/shared'
import { Heading } from '@/components/ui'
import { getMovieDetail } from '@/services/MovieService'
import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const params = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [episodes, setEpisodes] = useState<ServerDaum[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchMovie()
  }, [params])

  async function fetchMovie() {
    if (!params.slug) return
    try {
      const movieInfo = await getMovieDetail({ slug: params.slug })
      const listEpisodes = movieInfo?.episodes[0].server_data
      listEpisodes[0].link_embed
      setMovie(movieInfo)
      setEpisodes(listEpisodes)
    } catch (error) {
      console.error(error)
    }
  }

  function handleBack() {
    navigate(-1)
  }

  function getUrlVideo() {
    if (episodes.length > 1) {
      return episodes[Number(params?.episode) - 1 || 1]?.link_m3u8
    }
    return episodes[0]?.link_m3u8
  }

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center bg-black">
      <div
        className="absolute inset-x-0 top-0 z-10 h-[60px] w-full"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.7) 10%, transparent)',
        }}
      ></div>
      <button
        className="absolute left-4 top-4 z-10 flex items-center gap-xs"
        onClick={handleBack}
      >
        <IoIosArrowBack size={30} />
        <Heading className="hover:underline">Quay lại</Heading>
      </button>
      <div className="absolute left-1/2 top-4 z-10 hidden -translate-x-1/2 lg:block">
        <Heading className="whitespace-nowrap">{movie?.name}</Heading>
      </div>
      <ReactPlayer
        url={getUrlVideo()}
        playsinline
        playIcon={<FaPlay size={50} color="red" />}
        controls
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        fallback={<Loading type="preloader" loading />}
        playing={true}
        stopOnUnmount
      />
    </div>
  )
}

export default Player
