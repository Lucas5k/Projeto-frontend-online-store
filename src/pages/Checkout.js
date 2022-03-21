import React, { Component } from 'react';
import Header from '../components/Header';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCheckout: [],
      fullName: '',
      email: '',
      cpf: '',
      cep: '',
      phone: '',
      fullAddress: '',
    };
  }

  componentDidMount() {
    this.createListItem();
  }

  createListItem = () => {
    let cartItems = localStorage.getItem('cartProducts');
    cartItems = JSON.parse(cartItems);
    const fullPrice = cartItems.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    const set = new Set();
    const listCheckout = cartItems.filter((ele) => {
      const items = JSON.stringify(ele);
      return !set.has(items) && set.add(items);
    });
    console.log(listCheckout);
    this.setState({
      listCheckout,
      cartItems,
      fullPrice,
    });
  }

  // paymentMethod = ({ target }) => target.value;

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  countItems = (id, cartItems) => cartItems
    .reduce((acc, curr) => {
      if (curr.id === id) {
        acc += 1;
      }
      return acc;
    }, 0)

  render() {
    const {
      listCheckout,
      cartItems,
      fullName,
      email,
      cpf,
      cep,
      phone,
      fullAddress,
      fullPrice } = this.state;
    return (
      <>
        <Header />
        <main className="checkout-main">
          <section>
            <h3>Revise seus produtos: </h3>
            {(
              listCheckout.map(({ id, thumbnail, title, price }) => (
                <div key={ id } className="checkout-product">
                  <img src={ thumbnail } alt={ title } />
                  <p>{ title }</p>
                  <p>
                    { `${this.countItems(id, cartItems)} uni.` }
                  </p>
                  <p>
                    {`R$ ${Number(
                      this.countItems(id, cartItems) * price,
                    ).toFixed(2).replace('.', ',')}`}
                  </p>
                </div>
              ))
            )}
            <div className="totalCheckout">
              <p>{ `Total: R$ ${Number(fullPrice).toFixed(2).replace('.', ',')}` }</p>
            </div>
          </section>
          <form className="checkoutForm">
            <h3>Informações do comprador</h3>
            <label htmlFor="userFullName">
              <h5>Nome completo</h5>
              <input
                data-testid="checkout-fullname"
                id="userFullName"
                name="fullName"
                value={ fullName }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userEmail">
              <h5>Email</h5>
              <input
                data-testid="checkout-email"
                id="userEmail"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userCpf">
              <h5>CPF</h5>
              <input
                data-testid="checkout-cpf"
                id="userCpf"
                name="cpf"
                value={ cpf }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userPhone">
              <h5>Telefone</h5>
              <input
                data-testid="checkout-phone"
                id="userPhone"
                name="phone"
                value={ phone }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userCep">
              <h5>CEP</h5>
              <input
                data-testid="checkout-cep"
                id="userCep"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="userFullAddress">
              <h5>Endereço</h5>
              <input
                data-testid="checkout-address"
                id="userFullAddress"
                name="fullAddress"
                value={ fullAddress }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="#">
              <img src="https://logodownload.org/wp-content/uploads/2019/09/boleto-logo.png" alt="Boleto bancário." />
              <input
                type="radio"
                name="payment"
                value="boleto"
                onChange={ this.paymentMethod }
              />
            </label>
            <label htmlFor="#">
              <img src="https://icons-for-free.com/iconfiles/png/512/payment+online+transaction+payment+method+visa+icon-1320186278106432321.png" alt="Visa." />
              <input
                type="radio"
                name="payment"
                value="visa"
              />
              <img src="https://pt.seaicons.com/wp-content/uploads/2015/06/Master-Card-icon.png" alt="Mastercard." />
              <input
                type="radio"
                name="payment"
                value="masterCard"
              />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVz95FWm_kkRqqIpLaghhI0RhW8IXQAEgngPXQwBIjkCyCVoZ1CMC8Kl-IyyKrroIB7Y&usqp=CAU" alt="Elo." />
              <input
                type="radio"
                name="payment"
                value="elo"
              />
            </label>
            <button type="button">
              Comprar
            </button>
          </form>
        </main>
      </>
    );
  }
}

export default Checkout;
