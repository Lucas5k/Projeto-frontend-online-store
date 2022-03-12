import React, { Component } from 'react';
import CardProduct from '../components/CardProduct';
import Header from '../components/Header';
import {
  getCategories,
  getProductsFromCategory,
  getProductsFromQuery,
} from '../services/api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      queryInput: '',
      productList: [],
    };
  }

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
    if (!localStorage.getItem('cartProducts')) {
      localStorage.setItem('cartProducts', '[]');
    }
  }

  handleClick = async ({ target }) => {
    const { id } = target;
    const response = await getProductsFromCategory(id);
    const productList = response.results;
    this.setState({ productList });

    const NUMBER_OF_PRODUCTS = 2;
    const categoriesList = document.querySelector('.categoriesList');
    if (productList.length > NUMBER_OF_PRODUCTS) {
      categoriesList.style.overflowY = 'hidden';
      categoriesList.style.height = '100%';
    } else {
      categoriesList.style.overflowY = 'scroll';
      categoriesList.style.height = '82vh';
    }
  }

  handleButton = async ({ target }) => {
    const { value } = target;
    const response = await getProductsFromQuery(value);
    const productList = response.results;
    this.setState({ productList });

    const NUMBER_OF_PRODUCTS = 2;
    const categoriesList = document.querySelector('.categoriesList');
    if (productList.length > NUMBER_OF_PRODUCTS) {
      categoriesList.style.overflowY = 'hidden';
      categoriesList.style.height = '100%';
    } else {
      categoriesList.style.overflowY = 'scroll';
      categoriesList.style.height = '82vh';
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { categoriesList, queryInput, productList } = this.state;
    return (
      <div>
        <Header />
        <main className="main">
          <aside className="categoriesList">
            <h3>Categorias</h3>
            {
              categoriesList.map(({ id, name }) => (
                <div key={ id }>
                  <button
                    type="button"
                    data-testid="category"
                    id={ id }
                    onClick={ this.handleClick }
                  >
                    {name}
                  </button>
                </div>
              ))
            }
          </aside>
          <section className="productShowroom">
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <label htmlFor="queryInput">
              <input
                id="queryInput"
                data-testid="query-input"
                name="queryInput"
                onChange={ this.handleChange }
                value={ queryInput }
                type="text"
              />
              <button
                data-testid="query-button"
                type="button"
                onClick={ this.handleButton }
                value={ queryInput }
              >
                Pesquisar
              </button>
            </label>
            <ul className={ productList.length === 0 ? 'noProduct' : 'productList' }>
              {
                productList.length ? productList.map((list) => (
                  <CardProduct key={ list.id } list={ list } />
                ))
                  : <span>Nenhum produto foi encontrado</span>
              }
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

export default Main;
