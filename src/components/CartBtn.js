import PropTypes from 'prop-types';
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

  componentDidUpdate(prevProps) {
    const { cartCount } = this.props;
    if (cartCount !== prevProps.cartCount) {
      this.handleCart();
    }
  }

  handleCart = () => {
    const { cartCount } = this.props;
    if (!cartCount) {
      const cartItems = localStorage.getItem('quant');
      this.setState({ cartCount: cartItems });
    } else {
      this.setState({ cartCount });
    }
  }

  render() {
    const { cartCount } = this.state;
    return (
      <Link data-testid="shopping-cart-button" to="/shoppingcart" className="cartLink">
        <div>
          <img src="https://cdn-icons-png.flaticon.com/512/34/34627.png" alt="Cart icon." />
          {Number(cartCount) !== 0 && (
            <div>
              <span data-testid="shopping-cart-size">{ cartCount }</span>
            </div>
          )}
        </div>
      </Link>
    );
  }
}

CartBtn.propTypes = {
  cartCount: PropTypes.string,
}.isRequired;

export default CartBtn;
