import { Movie } from '@/@types/movie'
import ApiService from './ApiService'

const getNewestMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/phim-sap-chieu',
    method: 'GET',
  })
  return items
}

const getHotMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/hot',
    method: 'GET',
  })
  return items
}

const getMovieDetail = async ({ slug }: { slug: string }) => {
  const {
    data: {
      data: { item },
    },
  } = await ApiService.fetchData<{ data: { item: Movie } }>({
    url: `/phim/${slug}`,
    method: 'GET',
  })
  return item
}

const getFeatureMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/phim-le',
    method: 'GET',
  })
  return items
}

const getSeriesMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/phim-bo',
    method: 'GET',
  })
  return items
}

const getTvShows = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/tv-shows',
    method: 'GET',
  })
  return items
}

const getCartoonMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/hoat-hinh',
    method: 'GET',
  })
  return items
}

const getMostViewedMovies = async () => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: '/danh-sach/moi',
    method: 'GET',
  })
  return items
}

const getMovieByCategory = async ({ slug }: { slug: string }) => {
  const {
    data: {
      data: { items },
    },
  } = await ApiService.fetchData<{ data: { items: Movie[] } }>({
    url: `/danh-sach/${slug}`,
    method: 'GET',
  })
  return items
}

export {
  getNewestMovies,
  getHotMovies,
  getMovieDetail,
  getFeatureMovies,
  getSeriesMovies,
  getTvShows,
  getCartoonMovies,
  getMostViewedMovies,
  getMovieByCategory,
}
