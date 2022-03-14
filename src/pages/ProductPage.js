import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getProductsFromId } from '../services/api';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    const { match: { params: { id: productId } } } = this.props;
    const result = await getProductsFromId(productId);
    const { thumbnail, price, title } = result;
    this.setState({ thumbnail, price, title, result });
  }

  handleCLick = ({ target }) => {
    let { value } = target;
    let cart = localStorage.getItem('cartProducts');
    cart = JSON.parse(cart);
    value = JSON.parse(value);
    if (!cart) {
      localStorage.setItem('cartProducts', JSON.stringify([value]));
    } else {
      cart.push(value);
      localStorage.setItem('cartProducts', JSON.stringify(cart));
    }
  }

  render() {
    const { thumbnail, price, title, result } = this.state;
    return (
      <>
        <Header />
        <main className="productPageMain">
          <aside>
            <img src={ thumbnail } alt={ title } />
          </aside>
          <section>
            <h1 data-testid="product-detail-name">{title}</h1>
            <p>
              R$
              {String(Number(price).toFixed(2)).replace('.', ',')}
            </p>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.handleCLick }
              value={ JSON.stringify(result) }
            >
              Adicionar ao Carrinho
            </button>
          </section>
        </main>
      </>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductPage;
