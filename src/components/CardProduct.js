import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { list } = this.props;
    console.log(list);
    return (
      <Link to={ `/product/${list.id}` } data-testid="product-detail-link">
        <li data-testid="product">
          <span>{ list.title }</span>
          <img src={ list.thumbnail } alt={ list.title } />
          <p>{ list.price }</p>
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
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProduct;
