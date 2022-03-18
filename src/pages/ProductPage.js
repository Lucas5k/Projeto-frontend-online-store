import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getProductsFromId } from '../services/api';

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      evaluation: '',
      rating: '',
      productResume: [],
      arraylenght: true,
      cartCount: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id: productId } } } = this.props;
    const result = await getProductsFromId(productId);
    const { thumbnail, price, title, shipping } = result;
    const { free_shipping: freeShipping } = shipping;
    this.setState({ thumbnail, price, title, result, freeShipping });
    if (!localStorage.getItem(productId)) {
      localStorage.setItem(productId, '[]');
      this.setState({
        arraylenght: false,
      });
    }
    const aval = localStorage.getItem(productId);
    const aval1 = JSON.parse(aval);
    this.setState({
      productResume: aval1,
    });
    this.handleCart();
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
    this.handleCart();
  }

  handleAvaliation = () => {
    const { match: { params: { id: productId } } } = this.props;
    const { email, evaluation, rating } = this.state;
    const productEvaluation = { email, evaluation, rating };
    const aval = localStorage.getItem(productId);
    const aval1 = JSON.parse(aval);
    this.setState({
      productResume: aval1,
      email: '',
      evaluation: '',
      rating: '',
      arraylenght: true,
    }, () => {
      this.setState((prevState) => ({
        productResume: [...prevState.productResume, productEvaluation],
      }), () => {
        const { productResume } = this.state;
        localStorage.setItem(productId, JSON.stringify(productResume));
      });
    });
  }

  onChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleCart = () => {
    const cartItems = localStorage.getItem('cartProducts');
    const cartCount = JSON.parse(cartItems).length;
    this.setState({ cartCount });
    localStorage.setItem('quant', cartCount);
  }

  render() {
    const {
      thumbnail,
      price,
      title,
      result,
      email,
      evaluation,
      productResume,
      arraylenght,
      cartCount,
      freeShipping } = this.state;
    return (
      <>
        <Header cartCount={ cartCount } />
        <main className="productPageMain">
          <aside>
            <img src={ thumbnail } alt={ title } />
          </aside>
          <section>
            <h1 data-testid="product-detail-name">{title}</h1>
            <div className="priceAndShipping">
              <p>
                R$
                {String(Number(price).toFixed(2)).replace('.', ',')}
              </p>
              {freeShipping
            && (
              <div>
                <img src="https://static.thenounproject.com/png/1767562-200.png" alt="Free shipping icon." />
                <span data-testid="free-shipping">
                  Frete grátis
                </span>
              </div>
            )}
            </div>
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ this.handleCLick }
              value={ JSON.stringify(result) }
            >
              Adicionar ao Carrinho
            </button>
            <div className="rate">
              <p>Avaliação: </p>
              <span>Nome: </span>
              <input
                data-testid="product-detail-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.onChange }
                className="namefield"
              />
              <span>Comentário:</span>
              <textarea
                data-testid="product-detail-evaluation"
                type="text"
                name="evaluation"
                value={ evaluation }
                onChange={ this.onChange }
                className="txtareafield"
              />
              <span>Nota: </span>
              <input
                name="rating"
                type="radio"
                value="1"
                onChange={ this.onChange }
                data-testid="1-rating"
              />
              <input
                name="rating"
                type="radio"
                value="2"
                onChange={ this.onChange }
                data-testid="2-rating"
              />
              <input
                name="rating"
                type="radio"
                value="3"
                onChange={ this.onChange }
                data-testid="3-rating"
              />
              <input
                name="rating"
                type="radio"
                value="4"
                onChange={ this.onChange }
                data-testid="4-rating"
              />
              <input
                name="rating"
                type="radio"
                value="5"
                onChange={ this.onChange }
                data-testid="5-rating"
              />
              <button
                data-testid="submit-review-btn"
                onClick={ this.handleAvaliation }
                type="button"
              >
                Submit
              </button>
            </div>
          </section>
          <div>
            {
              arraylenght
          && (
            productResume.map((elemento) => (
              <section key={ elemento.email }>
                Email:
                <span>{ elemento.email }</span>
                Avaliação:
                <span>{ elemento.evaluation }</span>
                Nota:
                <span>{ elemento.rating }</span>
              </section>
            )))
            }
          </div>
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
