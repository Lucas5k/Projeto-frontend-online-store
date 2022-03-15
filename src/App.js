import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import Main from './pages/Main';
import ProductPage from './pages/ProductPage';
import ShoppingCart from './pages/ShoppingCart';

if (!localStorage.getItem('cartProducts')) {
  localStorage.setItem('cartProducts', '[]');
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Main } />
          <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <ProductPage { ...props } /> }
          />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
