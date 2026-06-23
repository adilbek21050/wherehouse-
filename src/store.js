
import { createStore, combineReducers } from 'redux';

const defaultProducts = [
  { id: 1, barcode: '4601234567890', color: 'Белый', name: 'Молоко 1л', price: 85, stock: 24, rack: 'A', level: '2' },
  { id: 7, barcode: '4601234567890', color: 'Белый', name: 'Молоко 1л', price: 85, stock: 24, rack: 'A', level: '2' },
  { id: 2, barcode: '4601234567891', color: 'Белый', name: 'Хлеб белый', price: 45, stock: 15, rack: 'A', level: '2' },
  { id: 3, barcode: '4601234567892', color: 'Белый', name: 'Сахар 1кг', price: 72, stock: 8, rack: 'A', level: '2' },
  { id: 4, barcode: '4601234567893', color: 'Черный', name: 'Чай черный', price: 120, stock: 31, rack: 'A', level: '2' },
  { id: 5, barcode: '4601234567894', color: 'Коричневый', name: 'Кофе растворимый', price: 350, stock: 5, rack: 'A', level: '2' },
  { id: 6, barcode: '4601234567894', color: 'Коричневый', name: 'туфли', price: 350, stock: 5, rack: 'A', level: '2' }
]

const persistedProducts = (() => {
  try {
    const raw = localStorage.getItem('warehouse_products');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();


const initialState = {
  warehouse: {
    products: persistedProducts || defaultProducts,
    search: '',
  },
};

function warehouseReducer(state = initialState.warehouse, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload.updates }
            : product
        ),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  warehouse: warehouseReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('warehouse_products', JSON.stringify(state.warehouse.products));
  } catch {
    // ignore storage errors
  }
});

export default store;
export const setSearch = (value) => ({ type: 'SET_SEARCH', payload: value });
export const updateProduct = (id, updates) => ({ type: 'UPDATE_PRODUCT', payload: { id, updates } });


