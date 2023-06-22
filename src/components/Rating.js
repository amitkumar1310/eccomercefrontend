import React from 'react';

function Rating({ value, text, color }) {
    console.log(text);
  const starStyle = {
    color: color, // Apply the color here
  };
  return (
    <div className='rating'>
      <span>
        <i
          style={starStyle} // Use the starStyle variable here
          className={
            value >= 1
              ? 'fas fa-star' // solid star
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={starStyle} // Use the starStyle variable here
          className={
            value >= 2
              ? 'fas fa-star' // solid star
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={starStyle} // Use the starStyle variable here
          className={
            value >= 3
              ? 'fas fa-star' // solid star
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={starStyle} // Use the starStyle variable here
          className={
            value >= 4
              ? 'fas fa-star' // solid star
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={starStyle} // Use the starStyle variable here
          className={
            value >= 5
              ? 'fas fa-star' // solid star
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>{text} reviews</span>
    </div>
  );
}

export default Rating;
