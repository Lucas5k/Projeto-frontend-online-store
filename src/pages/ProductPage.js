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
    console.log(result);
    const { thumbnail, price, title } = result;
    this.setState({ thumbnail, price, title });
  }

  render() {
    const { thumbnail, price, title } = this.state;
    return (
      <div>
        <Header />
        <main>
          <h1 data-testid="product-detail-name">{title}</h1>
          <section>
            <img src={ thumbnail } alt={ title } />
            <div>
              <p>{price}</p>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default ProductPage;
