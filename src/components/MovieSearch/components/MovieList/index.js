import React from 'react'
import './index.css'

class MovieList extends React.Component {
  compare(a, b) {
    const A = a.title.toUpperCase()
    const B = b.title.toUpperCase()
    if (A < B) return -1
    if (A > B) return 1
    // names must be equal, right?
    return 0
  }
  render (){
    return (
      <ul className="list-group">
      {
        this.props.items.sort(this.compare).map((item) => (
          <li className="list-item" data-category={item} key={item.id}>
            <img src={item.poster} alt={item.title}/>
            <div className="list-info">
              <div>
                <span className="title">{item.title}</span> <span className="rating">({item.rating})</span>
              </div>
              <div className="dates">{item.showtimes.toUpperCase()}</div>
            </div>
          </li>
        ))
       }
      </ul>
    )
  }
}

export default MovieList