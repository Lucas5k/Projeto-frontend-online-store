import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartBtn extends Component {
  render() {
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shoppingcart">
          <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart icon." />
        </Link>
      </div>
    );
  }
}

export default CartBtn;
