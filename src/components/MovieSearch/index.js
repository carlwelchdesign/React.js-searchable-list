import React from 'react'
import moment from 'moment'
import MovieList from './components/MovieList/'
import VenueTabs from './components/VenueTabs/'
import {getData} from './components/Services/'
import './index.css'

class MovieSearch extends React.Component {
  constructor(){
    super();
    this.state = {
      loaded: false,
      movies: null,
      showtimes: null,
      merged: null,
      display: null,
      currentvenue: null,
      test: false,
    }
  }

  componentDidMount() {
    getData(this)
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  onChangeHandler = (e) => {
    let updatedList = this.state.merged
    updatedList = updatedList.filter((item) => (
      item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    ))
    this.setState({display: updatedList})
  }

  getVenueList = (e) => {
    var active = document.querySelector('.active');
    if (active) active.classList.remove('active')
    e.target.className = 'venue-tab active'
    this.buildList(e.target.id)
  }

  sortDates = (dates) => (
    dates.sort((a, b) => (
      moment(a, 'HH:mm a')-moment(b, 'HH:mm a')
    )).join(' ')
  )

  buildList(id=this.state.showtimes[0].id) {
    const venue = this.state.showtimes.filter(item => item.id === id).map((item) => 
      Object.keys(item.showtimes).map((key, i) => 
        this.state.movies.filter(movie => movie.id === key).map((movie) => (
          {
            'id': movie.id,
            'title': movie.title,
            'poster': movie.poster,
            'showtimes': this.sortDates(item.showtimes[key]),
            'rating': movie.rating
          }
        ))[0]
      )
    )[0]
    let searchStr = document.getElementById('searchfield').value
    let filtered = venue.filter((item) => {
      return item.title.toLowerCase().search(searchStr) !== -1
    })
    this.setState({
      merged: venue,
      display: filtered
    });
  }

  resize = () => this.forceUpdate()

  render (){
    return (
      <div className="filter-list">
        <input id="searchfield" type="text" placeholder="Search Movies..." onChange={this.onChangeHandler}/>
        {
          this.state.loaded && !this.state.test ? (
            <div>
              <VenueTabs showtimes={this.state.showtimes} func={this.getVenueList}/>
              <MovieList items={this.state.display}/>
            </div>
          ):(
            <div>Loading...</div>
          )
        }
      </div>
    )
  }
}

export default MovieSearch


