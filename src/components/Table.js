import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';
import trash from '../images/lixeira.png';

function Table(props) {
  const { walletData: { expenses }, deleteDispatch } = props;

  const deleteButton = ({ target }) => {
    const expenseId = target.id;
    deleteDispatch(expenseId);
  }

  return (
    <div className="overflow-auto shadow-md shadow-gray-400 rounded-lg h-4/5 w-11/12">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-center">Descrição</th>
            <th className="px-6 py-3 text-center">Tag</th>
            <th className="px-6 py-3 text-center">Método de pagamento</th>
            <th className="px-6 py-3 text-center">Valor</th>
            <th className="px-6 py-3 text-center">Moeda</th>
            <th className="px-6 py-3 text-center">Câmbio utilizado</th>
            <th className="px-6 py-3 text-center">Valor convertido</th>
            <th className="px-6 py-3 text-center">Moeda de conversão</th>
            <th className="px-6 py-3 text-center">Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => {
            const { id, description, tag, method,
              value, currency, exchangeRates } = expense;
            return (
              <tr key={ id } className="bg-white border-b hover:bg-gray-100">
                <td className="px-6 py-4 text-center">{ description }</td>
                <td className="px-6 py-4 text-center">{ tag }</td>
                <td className="px-6 py-4 text-center">{ method }</td>
                <td className="px-6 py-4 text-center">{ Number(value).toFixed(2) }</td>
                <td className="px-6 py-4 text-center">{ exchangeRates[currency].name.split('/')[0] }</td>
                <td className="px-6 py-4 text-center">{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
                <td className="px-6 py-4 text-center">R$ { (value * Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td className="px-6 py-4 text-center">Real</td>
                <td className="px-6 py-4 space-x-4 text-center">
                <button
                type="button"
                id={id}
                onClick={ deleteButton }
                className="border-2 border-red-500 rounded-lg hover:bg-red-400"
                ><img src={trash} alt="trash" className="h-6 w-6 m-1"/></button> 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  walletData: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (expense) => dispatch(deleteExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
