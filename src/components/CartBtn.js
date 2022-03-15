import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CartBtn extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.handleCart();
  }

  handleCart = () => {
    const cartItems = localStorage.getItem('cartProducts');
    this.setState({ cartCount: JSON.parse(cartItems).length });
  }

  render() {
    const { cartCount } = this.state;
    return (
      <Link data-testid="shopping-cart-button" to="/shoppingcart" className="cartLink">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart icon." />
          <span data-testid="shopping-cart-size">{ cartCount }</span>
        </div>
      </Link>
    );
  }
}

export default CartBtn;
