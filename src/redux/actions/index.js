export const GET_EMAIL = 'GET_EMAIL';
export const CURRENCIES_WALLET = 'CURRENCIES_WALLET';
export const EXPENSES_WALLET = 'EXPENSES_WALLET';
export const DELETE_EXPENSE_TYPE = 'DELETE_EXPENSE_TYPE';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  payload: email,
});

export const currenciesWalletAction = (value) => ({
  type: CURRENCIES_WALLET,
  value,
});
export const expensesWalletAction = (returnAPI, othersStates) => ({
  type: EXPENSES_WALLET,
  returnAPI,
  othersStates,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE_TYPE,
  payload: expense,
});

export const currenciesThunk = (othersStates) => async (dispatch) => {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const requestJSON = await request.json();
    dispatch(expensesWalletAction(requestJSON, othersStates));
  } catch (error) {
    console.error(error.message);
  }
};