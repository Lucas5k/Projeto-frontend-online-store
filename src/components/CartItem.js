import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CartItem extends Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <article>
        <img src={ thumbnail } alt={ title } />
        <h1 data-testid="shopping-cart-product-name">{ title }</h1>
        <p>{ price }</p>
        <p data-testid="shopping-cart-product-quantity">1</p>
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
};

export default CartItem;
