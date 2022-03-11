import React, { Component } from 'react';
import CartBtn from '../components/CartBtn';
import { getCategories, getProductsFromQuery } from '../services/api';

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
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <CartBtn />
        <section>
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
        </section>
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
            botão
          </button>
        </label>
        <ul>
          {
            queryList.length ? queryList.map((list) => (
              <li data-testid="product" key={ list.id }>
                <span>{ list.title }</span>
                <img src={ list.thumbnail } alt={ list.title } />
                <p>{ list.price }</p>
              </li>
            ))
              : <span>Nenhum produto foi encontrado</span>
          }
        </ul>
      </div>
    );
  }
}

export default Main;
