import React, { Component } from 'react';
import CartBtn from '../components/CartBtn';
import { getCategories } from '../services/api';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesList: [],
    };
  }

  async componentDidMount() {
    const categoriesList = await getCategories();
    this.setState({
      categoriesList,
    });
  }

  render() {
    const { categoriesList } = this.state;
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
      </div>
    );
  }
}

export default Main;
