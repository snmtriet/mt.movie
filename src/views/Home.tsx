import { Movie } from '@/@types/movie'
import { BannerMovie, MovieSlide } from '@/components/shared'
import { ButtonNext, ButtonPrev } from '@/components/shared/Slide'
import { Heading, Section } from '@/components/ui'
import {
  getCartoonMovies,
  getFeatureMovies,
  getMostViewedMovies,
  getNewestMovies,
  getSeriesMovies,
  getTvShows,
} from '@/services/MovieService'
import { setModalMovie, useAppDispatch } from '@/store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [featureMovies, setFeatureMovies] = useState<Movie[]>([])
  const [seriesMovies, setSeriesMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<Movie[]>([])
  const [cartoonMovies, setCartoonMovies] = useState<Movie[]>([])
  const [mostViewedMovies, setMostViewedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams({ openSlug: '' })
  const openSlug = searchParams.get('openSlug')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!openSlug) return
    dispatch(
      setModalMovie({
        open: true,
        slug: openSlug,
      }),
    )
  }, [openSlug])

  useEffect(() => {
    fetchMovies()
  }, [])

  async function fetchMovies() {
    try {
      setLoading(true)
      const data = await getNewestMovies()
      setMovies(data)
      const featureMoviesData = await getFeatureMovies()
      setFeatureMovies(featureMoviesData)
      const seriesMoviesData = await getSeriesMovies()
      setSeriesMovies(seriesMoviesData)
      const tvShows = await getTvShows()
      setTvShows(tvShows)
      const cartoonMovies = await getCartoonMovies()
      setCartoonMovies(cartoonMovies)
      const mostViewedMovies = await getMostViewedMovies()
      setMostViewedMovies(mostViewedMovies)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <BannerMovie />
      <Section className="relative z-20 mt-28 sm:mt-60 xl:mt-28">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            Mới trên MT Movie
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="newest-movies-prev" />
            <ButtonNext className="newest-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={movies}
          navigation={{
            nextEl: '.newest-movies-next',
            prevEl: '.newest-movies-prev',
          }}
        />
      </Section>

      <Section className="relative z-20">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            Top xem nhiều
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="mostViewed-movies-prev" />
            <ButtonNext className="mostViewed-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={mostViewedMovies}
          navigation={{
            nextEl: '.mostViewed-movies-next',
            prevEl: '.mostViewed-movies-prev',
          }}
        />
      </Section>

      <Section className="relative z-20">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            Phim lẻ
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="feature-movies-prev" />
            <ButtonNext className="feature-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={featureMovies}
          navigation={{
            nextEl: '.feature-movies-next',
            prevEl: '.feature-movies-prev',
          }}
        />
      </Section>

      <Section className="relative z-20">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            Phim bộ
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="series-movies-prev" />
            <ButtonNext className="series-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={seriesMovies}
          navigation={{
            nextEl: '.series-movies-next',
            prevEl: '.series-movies-prev',
          }}
        />
      </Section>

      <Section className="relative z-20">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            TV Shows
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="tvShows-movies-prev" />
            <ButtonNext className="tvShows-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={tvShows}
          navigation={{
            nextEl: '.tvShows-movies-next',
            prevEl: '.tvShows-movies-prev',
          }}
        />
      </Section>

      <Section className="relative z-20">
        <div className="mb-xl flex items-center justify-between pr-2 md:pr-8">
          <Heading as="h2" className="px-2 text-2xl md:pl-8" bold>
            Hoạt hình
          </Heading>
          <div className="flex items-center gap-md">
            <ButtonPrev className="cartoon-movies-prev" />
            <ButtonNext className="cartoon-movies-next" />
          </div>
        </div>
        <MovieSlide
          loading={loading}
          movies={cartoonMovies}
          navigation={{
            nextEl: '.cartoon-movies-next',
            prevEl: '.cartoon-movies-prev',
          }}
        />
      </Section>
    </>
  )
}

export default Home
