import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Rating extends Component {
  onHover = ({ target }) => {
    const stars = document.querySelectorAll('section label img');
    const starCount = Number(target.alt[5]);

    // Make all stars gray
    stars.forEach((star) => {
      star.style = 'filter: brightness(0);';
      star.style = 'filter: saturate(100%);';
      star.style = 'invert(90%)';
      star.style = 'sepia(14%);';
      star.style = 'saturate(22%);';
      star.style = 'hue-rotate(313deg);';
      star.style = 'brightness(93%);';
      star.style = 'contrast(83%);';
    });

    for (let i = 1; i <= starCount; i += 1) {
      // Make hover stars yellow
      document.querySelector(`section label:nth-child(${i}) img`).style = 'filter: none;';
    }
  }

  render() {
    const { onChangeFuncProp } = this.props;
    return (
      <section className="rating">
        <label htmlFor="1-rating">
          <input
            name="rating"
            type="radio"
            value="1"
            onChange={ onChangeFuncProp }
            data-testid="1-rating"
            id="1-rating"
          />
          <img src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png" alt="Star 1" onMouseEnter={ this.onHover } />
        </label>
        <label htmlFor="2-rating">
          <input
            name="rating"
            type="radio"
            value="2"
            onChange={ onChangeFuncProp }
            data-testid="2-rating"
            id="2-rating"
          />
          <img src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png" alt="Star 2." onMouseEnter={ this.onHover } />
        </label>
        <label htmlFor="3-rating">
          <input
            name="rating"
            type="radio"
            value="3"
            onChange={ onChangeFuncProp }
            data-testid="3-rating"
            id="3-rating"
          />
          <img src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png" alt="Star 3." onMouseEnter={ this.onHover } />
        </label>
        <label htmlFor="4-rating">
          <input
            name="rating"
            type="radio"
            value="4"
            onChange={ onChangeFuncProp }
            data-testid="4-rating"
            id="4-rating"
          />
          <img src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png" alt="Star 4." onMouseEnter={ this.onHover } />
        </label>
        <label htmlFor="5-rating">
          <input
            name="rating"
            type="radio"
            value="5"
            onChange={ onChangeFuncProp }
            data-testid="5-rating"
            id="5-rating"
          />
          <img src="https://freepikpsd.com/file/2019/10/gold-star-icon-png-1-Transparent-Images-Free.png" alt="Star 5." onMouseEnter={ this.onHover } />
        </label>
      </section>
    );
  }
}

Rating.propTypes = {
  onChangeFuncProp: PropTypes.func.isRequired,
};

export default Rating;
