import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getEmail } from '../redux/actions'

function Login(props) {
  const { getEmailDispatch } = props
  const [disabled, setDisable] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  useEffect(() => {
    const SIX = 6;
    if (email.includes('@') && email.includes('.com') && password.length > SIX) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const handleClick = () => {
    getEmailDispatch(email);
    setRedirect(true);
  }

  return (
    <div className="bg-red-500 w-full h-screen flex justify-center items-center">
      <div className="bg-white shadow-gray-900 shadow-md rounded px-8 py-8 mb-4 flex flex-col items-center w-10/12 max-w-xl">
        <h1 className="font-bold text-2xl mb-10">Junqueira's Wallet</h1>
        <div className="mb-4 w-4/5">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold">
            Email:
            <input
              type="email"
              data-testid="email-input"
              name="email"
              onChange={ handleEmail }
              placeholder="Digite seu email"
              className=" mt-2 border-gray-400 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
        <div className="mb-10 w-4/5">
          <label htmlFor="senha" className="block text-gray-700 text-sm font-bold">
            Senha:
            <input
              type="password"
              data-testid="password-input"
              name="senha"
              onChange={ handlePassword }
              placeholder="Digite sua senha"
              className="mt-2 shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
        </div>
          <button
            type="button"
            disabled={ disabled }
            onClick={ handleClick }
            className="bg-red-500 hover:bg-red-700 text-white font-bold w-1/2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Entrar
          </button>
          { redirect && <Redirect to="/carteira" /> }
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  getEmailDispatch: (email) => dispatch(getEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
