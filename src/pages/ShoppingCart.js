import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CartItem from '../components/CartItem';
import Header from '../components/Header';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      products: [],
      filterProducts: [],
      checkout: false,
    };
  }

  componentDidMount() {
    this.createListItem();
  }

  addItem = (product) => {
    let cartItem = localStorage.getItem('cartProducts');
    cartItem = JSON.parse(cartItem);
    cartItem.push(product);
    localStorage.setItem('cartProducts', JSON.stringify(cartItem));
  }

  removeItem = (product) => {
    let cartItem = localStorage.getItem('cartProducts');
    cartItem = JSON.parse(cartItem);

    let delIndex = 0;
    const lastFoundIndex = () => {
      cartItem.forEach((x, i) => {
        if (x.id === product.id) {
          delIndex = i;
        }
      });
    };

    lastFoundIndex();

    cartItem.splice(delIndex, 1);
    localStorage.setItem('cartProducts', JSON.stringify(cartItem));
  }

  handleClick = (event) => {
    const { value, name } = event.target;
    if (name === 'add') {
      this.addItem(JSON.parse(value));
    } else {
      this.removeItem(JSON.parse(value));
    }
    this.createListItem();
  }

  createListItem = () => {
    let cartItems = localStorage.getItem('cartProducts');
    cartItems = JSON.parse(cartItems);
    const set = new Set();
    const filterProducts = cartItems.filter((ele) => {
      const items = JSON.stringify(ele);
      return !set.has(items) && set.add(items);
    });
    this.setState({
      filterProducts,
      products: cartItems,
    });
  }

  redirectToCheckout = () => {
    this.setState({
      checkout: true,
    });
  }

  render() {
    const { products, filterProducts, checkout } = this.state;
    return (
      <div>
        <Header />
        <main className="cartMain">
          {!products.length
            ? (
              <div>
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              </div>
            )
            : (
              filterProducts.map((element) => (<CartItem
                key={ element.id }
                handle={ this.handleClick }
                product={ element }
                count={
                  products.reduce((acc, curr) => {
                    if (curr.id === element.id) {
                      acc += 1;
                    }
                    return acc;
                  }, 0)
                }
              />))
            )}
          <button
            data-testid="checkout-products"
            type="button"
            onClick={ this.redirectToCheckout }
          >
            Finalizar compra
          </button>
          {(checkout && <Redirect to="/checkout" />)}
        </main>
      </div>
    );
  }
}

export default ShoppingCart;
