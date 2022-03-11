import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class CardProduct extends Component {
  render() {
    const { list } = this.props;
    console.log(list);
    return (
      <Link to="/">
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
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProduct;
