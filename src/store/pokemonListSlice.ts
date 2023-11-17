import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OutputType = {
  id: number;
  img: string;
  title: string;
};
export type StoreType = { value: OutputType[] }

const initialState: StoreType = { value: [] }

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    savePokemonList: (state, action: PayloadAction<OutputType[]>) => {
      console.log('action.payload', action.payload)
      state.value = action.payload
    },
  },
});

export const { savePokemonList } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;