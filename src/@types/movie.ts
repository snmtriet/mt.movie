export interface Movie {
  tmdb: Tmdb
  imdb: Imdb
  created: Created
  modified: Modified
  _id: string
  name: string
  slug: string
  origin_name: string
  content: string
  type: string
  status: string
  thumb_url: string
  poster_url: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: Category[]
  country: Country[]
  episodes: Episode[]
}

export interface Tmdb {
  type: string
  id: string
  season: number
  vote_average: number
  vote_count: number
}

export interface Imdb {
  id: string
}

export interface Created {
  time: string
}

export interface Modified {
  time: string
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface Country {
  id: string
  name: string
  slug: string
}

export interface Episode {
  server_name: string
  server_data: ServerDaum[]
}

export interface ServerDaum {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}
