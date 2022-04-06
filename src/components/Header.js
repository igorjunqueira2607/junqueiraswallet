import React from 'react';
import { connect } from 'react-redux';

function Header(props) {
  const { email, totalExpense } = props;

  const updateExpense = () => {
    let valueExpense = 0;
    totalExpense.forEach((expense) => {
      const moeda = expense.currency;
      const multiplication = Number(expense.value)
        * Number(expense.exchangeRates[moeda].ask);
      valueExpense += multiplication;
    });
    return valueExpense.toFixed(2);
  }

  return (
    <header className="flex bg-red-500 h-14 justify-between items-center px-3 shadow-sm shadow-gray-800 w-full text-white font-medium">
      <h3 data-testid="email-field" className="text-xs">Usuário: { email }</h3>
      <h1 className="text-lg font-bold">Junqueira's Wallet</h1>
      <span data-testid="total-field">Despesa Total: { updateExpense() } BRL</span>
    </header>
  )
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
