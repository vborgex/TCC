import { configureStore } from '@reduxjs/toolkit';
import usuarioReducer from './usuarioReducer';

const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
  },
});

export default store;
