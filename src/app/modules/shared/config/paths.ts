export const PATHS = {
  movies: {
    featured: '/movie/now_playing',
    details: (movieId: number) => `/movie/${movieId}`
  },
  series: {
    featured: '/tv/airing_today',
    details: (seriesId: number) => `/tv/${seriesId}`
  },
  search: `/search/multi`

}
