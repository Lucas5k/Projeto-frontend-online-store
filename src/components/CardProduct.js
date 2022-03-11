import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { list } = this.props;
    return (
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
    );
  }
}

CardProduct.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardProduct;
