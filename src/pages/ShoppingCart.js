import React, { Component } from 'react';
import CartItem from '../components/CartItem';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const cartItems = localStorage.getItem('cartProducts');
    this.setState({ products: JSON.parse(cartItems) });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {!products.length
          ? (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          )
          : (
            products.map((element) => (<CartItem
              key={ element.id }
              product={ element }
            />))
          )}
      </div>
    );
  }
}

export default ShoppingCart;
