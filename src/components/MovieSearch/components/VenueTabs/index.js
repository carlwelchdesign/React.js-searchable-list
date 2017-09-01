import React from 'react'
import './index.css'

class MovieList extends React.Component {
  componentDidMount(){
    const el = document.getElementsByClassName('venue-tab')
    el[0].classList.add('active')
  }
  checkStr(str){
    if (str.length>11 && window.innerWidth>455) {
      str = `${str.substring(0, 11)}...`
    }
    return str.toUpperCase()
  }
  render (){
    return (
      <ul className="venue-tabs">
        {
          this.props.showtimes.map((item) => (
            <button className="venue-tab" key={item.id} id={item.id} onClick={this.props.func}>{this.checkStr(item.name)}</button>
          ))
        }
      </ul>
    )
  }
}

export default MovieList
