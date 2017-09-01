import axios from 'axios'

const MOVIE_META_JSON = `${process.env.PUBLIC_URL}/data/movie_metadata.json`
const SHOWTIMES_JSON = `${process.env.PUBLIC_URL}/data/theater_showtimes.json`

export const getData = (_this_) => {
  const _this = _this_
  const getMovies = () => (
    axios.get(MOVIE_META_JSON)
      .then((response) => {
        _this.setState({ movies: response.data })
      })
      .catch((error) => {
        console.log('error', error)
      })
  )
  const getShowtimes = () => (
    axios.get(SHOWTIMES_JSON)
      .then((response) => {
        _this.setState({ showtimes: response.data })
      })
      .catch((error) => {
        console.log('error', error)
      })
  )
  axios.all([getMovies(), getShowtimes()])
    .then(axios.spread((movies, showtimes) => {
      _this.buildList()
      _this.setState({ loaded: true })
    }))
}