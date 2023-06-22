
import React from 'react'
import './backgroundvideo.css'
import bgimage from '../videos/anime_eart.mp4';
function SearchBar() {
  return (
    <div className='SearchBar'>
      <div className='video-container'>
      <video autoPlay loop muted>
        <source src={bgimage} type='video/mp4'/>
        
      </video>
      <div style={{marginTop:'90px'}} className='overl'>
      <div className='overlay' style={{margintop:'100px'}}>
          <div className='overlay-content' >
            <h4>This is the most secure shopping app</h4>
            <p>For any query, contact us </p>
            {/* <p>Dummy Email: example@example.com</p>
            <p>Contact No: 123-456-7890</p>
            <p>Contact Address: 123 Street, City, Country</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
      