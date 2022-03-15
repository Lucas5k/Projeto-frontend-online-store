import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardProduct extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  handleCLick = ({ target }) => {
    let { value } = target;
    let cart = localStorage.getItem('cartProducts');
    cart = JSON.parse(cart);
    value = JSON.parse(value);
    if (!cart) {
      localStorage.setItem('cartProducts', JSON.stringify([value]));
    } else {
      cart.push(value);
      localStorage.setItem('cartProducts', JSON.stringify(cart));
    }
  }

  render() {
    const { list } = this.props;
    const { shipping: { free_shipping: freeShipping } } = list;
    return (
      <div className="singleCardProduct">
        <Link
          to={ `/product/${list.id}` }
          data-testid="product-detail-link"
          className="cardProduct"
        >
          <li data-testid="product">
            <img src={ list.thumbnail } alt={ list.title } />
            <div className="productCardInfo">
              <span>{ list.title }</span>
              <p>
                R$
                { String(list.price.toFixed(2)).replace('.', ',') }
              </p>
            </div>
          </li>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.handleCLick }
          value={ JSON.stringify(list) }
          className="addCartBtn"
        >
          Adicionar ao Carrinho
        </button>
        {freeShipping
          && (
            <span data-testid="free-shipping">
              Frete Grátis!!
            </span>
          )}
      </div>
    );
  }
}

CardProduct.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
  }).isRequired,
};

export default CardProduct;
