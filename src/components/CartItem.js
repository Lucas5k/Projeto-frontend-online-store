import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  render() {
    const { product, count, handle } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <article className="everyCart">
        <div className="cartItem">
          <img src={ thumbnail } alt={ title } />
          <h1 data-testid="shopping-cart-product-name">{ title }</h1>
          <p>
            R$
            { String(Number(price).toFixed(2)).replace('.', ',') }
          </p>
          <div className="qntControl">
            <button
              data-testid="product-decrease-quantity"
              type="button"
              value={ JSON.stringify(product) }
              name="less"
              onClick={ handle }
            >
              -
            </button>
            <div>
              <p data-testid="shopping-cart-product-quantity">{ count }</p>
            </div>
            <button
              data-testid="product-increase-quantity"
              type="button"
              value={ JSON.stringify(product) }
              name="add"
              onClick={ handle }
            >
              +
            </button>
          </div>
        </div>
        <div className="total">
          Total:
          {' '}
          { String(Number(price * count).toFixed(2)).replace('.', ',') }
        </div>
      </article>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  handle: PropTypes.func.isRequired,
};

export default CartItem;
