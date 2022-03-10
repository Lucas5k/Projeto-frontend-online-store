import React, { Component } from 'react';
import CartBtn from '../components/CartBtn';

class Main extends Component {
  render() {
    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CartBtn />
      </div>
    );
  }
}

export default Main;
