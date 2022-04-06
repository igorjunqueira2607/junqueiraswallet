import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { currenciesThunk } from '../redux/actions';

function Forms(props) {
  const { expenseData } = props;
  const LENGTH_MOEDAS = 3;
  const [currencies, setCurrencies] = useState([]);
  const [id, setId] = useState(0);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  const fetchAPI = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJSON = await request.json();
    const arrayCurrencies = Object.keys(requestJSON);
    setCurrencies({
      currencies: arrayCurrencies.filter((moeda) => moeda.length === LENGTH_MOEDAS),
    });
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const handleValue = ({ target: { value } }) => {
    setValue(value);
  };

  const handleCurrency = ({ target: { value } }) => {
    setCurrency(value);
  };

  const handleMethod = ({ target: { value } }) => {
    setMethod(value);
  };

  const handleTag = ({ target: { value } }) => {
    setTag(value);
  };

  const handleDescription = ({ target: { value } }) => {
    setDescription(value);
  };

  const handleClick = () => {
    expenseData({ value, description, currency, method, tag, id });
    setValue('');
    setDescription('');
    setId(id + 1);
  }

  return (
    <form className="pt-4 pb-3 px-4 w-full flex flex-wrap border-b  border-gray-400 mb-4 items-center justify-between bg-gray-100">
      <label htmlFor="input-value" className="block text-sm font-medium text-gray-900">
        Valor:
        <input
          type="text"
          id="input-value"
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ handleValue }
          className="block w-40 border p-1 border-gray-400 rounded-lg"
        />
      </label>
      <label htmlFor="input-coin" className="block text-sm font-medium text-gray-900">
        Moeda:
        <select
          id="input-coin"
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ handleCurrency }
          className="block w-40 bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-red-500 p-1"
        >
          { currencies.currencies && currencies.currencies.map((moeda) => (
            <option data-testid={ moeda } key={ moeda }>{ moeda }</option>
          )) }
        </select>
      </label>
      <label htmlFor="input-pay" className="block text-sm font-medium text-gray-900">
        Método de pagamento:
        <select
          id="input-pay"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ handleMethod }
          className="bg-gray-50 w-40 border block border-gray-400 text-gray-900 text-sm rounded-lg focus:border-red-500 p-1"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
      <label htmlFor="input-tag" className="block text-sm font-medium text-gray-900">
        Tag:
        <select
          id="input-tag"
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ handleTag }
          className="bg-gray-50 w-40 border block border-gray-400 text-gray-900 text-sm rounded-lg focus:border-red-500 p-1"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
      <label htmlFor="input-description" className="block text-sm font-medium text-gray-900">
        Descrição:
        <input
          type="text"
          id="input-description"
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ handleDescription }
          className="w-40 block p-1 border border-gray-400 rounded-lg"
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        className="bg-green-500 text-white font-semibold px-3 py-2 rounded-md hover:bg-green-600 ease-in-out"
      >
        Adicionar

      </button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  expenseData: (expense) => dispatch(currenciesThunk(expense)),
});

export default connect(null, mapDispatchToProps)(Forms);
