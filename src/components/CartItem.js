import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  render() {
    const { product, count, handle } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <article>
        <img src={ thumbnail } alt={ title } />
        <h1 data-testid="shopping-cart-product-name">{ title }</h1>
        <p>{ price }</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          value={ JSON.stringify(product) }
          name="less"
          onClick={ handle }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{ count }</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          value={ JSON.stringify(product) }
          name="add"
          onClick={ handle }
        >
          +
        </button>
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
