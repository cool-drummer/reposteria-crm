import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  sabor: string;
  imagen_url: string;
  estado: 'activo' | 'archivado' | 'agotado';
  categoria_id: number;
}

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<Product[]>(`${process.env.REACT_APP_API_URL}/api/productos`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: Omit<Product, 'id'>) => {
    const response = await axios.post<Product>(`${process.env.REACT_APP_API_URL}/api/productos`, product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, ...product }: Product) => {
    const response = await axios.put<Product>(`${process.env.REACT_APP_API_URL}/api/productos/${id}`, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/productos/${id}`);
    return id;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar los productos';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer; 