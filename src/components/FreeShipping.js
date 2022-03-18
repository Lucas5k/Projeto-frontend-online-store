import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FreeShipping extends Component {
  render() {
    const { price, freeShipping } = this.props;
    return (
      <div className="priceAndShipping">
        <p>
          R$
          {String(Number(price).toFixed(2)).replace('.', ',')}
        </p>
        {freeShipping
            && (
              <div>
                <img src="https://static.thenounproject.com/png/1767562-200.png" alt="Free shipping icon." />
                <span data-testid="free-shipping">
                  Frete grátis
                </span>
              </div>
            )}
      </div>
    );
  }
}

FreeShipping.propTypes = {
  price: PropTypes.number.isRequired,
  freeShipping: PropTypes.bool.isRequired,
};

export default FreeShipping;
