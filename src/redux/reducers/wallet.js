import { CURRENCIES_WALLET, EXPENSES_WALLET, DELETE_EXPENSE_TYPE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_WALLET:
    return {
      ...state,
      currencies: [action.value],
    };
  case EXPENSES_WALLET:
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.othersStates, exchangeRates: action.returnAPI }],
    };
    case DELETE_EXPENSE_TYPE:
      return {
        ...state,
        expenses: [...state.expenses].filter(({ id }) => id !== Number(action.payload)),
      };
  default:
    return state;
  }
}

export default wallet;
