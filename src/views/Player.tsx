import { Movie, ServerDaum } from '@/@types/movie'
import { Loading } from '@/components/shared'
import { Heading } from '@/components/ui'
import { getMovieDetail } from '@/services/MovieService'
import { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import ReactPlayer from 'react-player'
import { useNavigate, useParams } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'

const Player = () => {
  const params = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(false)
  const [episodes, setEpisodes] = useState<ServerDaum[]>([])
  const navigate = useNavigate()
  const { width, height } = useWindowSize()

  useEffect(() => {
    fetchMovie()
  }, [params])

  async function fetchMovie() {
    if (!params.slug) return
    try {
      setLoading(true)
      const movieInfo = await getMovieDetail({ slug: params.slug })
      const listEpisodes = movieInfo?.episodes[0].server_data
      listEpisodes[0].link_embed
      setMovie(movieInfo)
      setEpisodes(listEpisodes)
      document.title = movieInfo?.name ?? movie?.origin_name
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
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
    <div className="relative flex h-screen w-full items-center justify-center bg-black">
      {loading && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
          <Loading loading spinnerClass="w-[100px] h-[100px]" />
        </div>
      )}
      {!getUrlVideo() && !loading && (
        <Heading as="h4" className="mx-1 text-center">
          Phim sẽ được cập nhật trong thời gian sớm nhất
        </Heading>
      )}

      <div
        className="absolute inset-x-0 top-0 z-10 h-[70px] w-full"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200, 0, 0, 0.2) 10%, transparent)',
        }}
      />

      <div className="absolute top-0 z-10 flex w-full items-center justify-between p-2">
        <button className="flex items-center gap-xs" onClick={handleBack}>
          <IoIosArrowBack size={30} />
          <Heading className="hover:underline">Quay lại</Heading>
        </button>
        <div className="hidden md:block">
          <Heading className="whitespace-nowrap">{movie?.name}</Heading>
        </div>
        {episodes.length > 1 ? (
          <Heading className="whitespace-nowrap">
            Tập {params.episode || 1}
          </Heading>
        ) : (
          <div />
        )}
      </div>

      <ReactPlayer
        url={getUrlVideo()}
        playsinline
        volume={1}
        controls
        width={width / 1.005}
        height={height / 1.2}
        style={{
          position: 'absolute',
          inset: 0,
          left: '50%',
          top: '30%',
          transform: 'translate(-50%, -30%)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        fallback={<Loading type="preloader" loading />}
        playing={true}
        stopOnUnmount
      />
    </div>
  )
}

export default Player
