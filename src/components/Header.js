import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartBtn from './CartBtn';

class Header extends Component {
  render() {
    const { cartCount } = this.props;
    return (
      <header className="header">
        <div className="logoTitle">
          <Link to="/">
            <img src="https://www.iconpacks.net/icons/2/free-store-icon-2017-thumb.png" alt="Store logo." />
          </Link>
          <h1>Front-End Online Store</h1>
        </div>
        <CartBtn cartCount={ cartCount } />
      </header>
    );
  }
}

Header.propTypes = {
  cartCount: PropTypes.string,
}.isRequired;

export default Header;
