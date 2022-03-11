import React, { Component } from 'react';
import Header from '../components/Header';
import { getCategories, getProductsFromQuery } from '../services/api';
import CardProduct from '../components/CardProduct';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
      queryInput: '',
      queryList: [],
    };
  }

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
  }

  handleButton = async ({ target }) => {
    const { value } = target;
    const response = await getProductsFromQuery(value);
    const queryList = response.results;
    console.log(queryList);
    this.setState({ queryList });

    const NUMBER_OF_PRODUCTS = 2;
    const categoriesList = document.querySelector('.categoriesList');
    if (queryList.length > NUMBER_OF_PRODUCTS) {
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
    const { categoriesList, queryInput, queryList } = this.state;
    return (
      <div>
        <Header />
        <main className="main">
          <aside className="categoriesList">
            <h3>Categorias</h3>
            {
              categoriesList.map(({ id, name }) => (
                <p
                  key={ id }
                  data-testid="category"
                >
                  {name}
                </p>
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
            <ul className={ queryList.length === 0 && 'noProduct' }>
              {
                queryList.length ? queryList.map((list) => (
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
