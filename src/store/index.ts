import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { type StoreType as SearchStoreType } from './searchSlice';
import pokemonListReducer, { type StoreType as PokemonListStoreType } from './pokemonListSlice';

export type StoreType = {
    search: SearchStoreType;
    pokemonList: PokemonListStoreType;
}
export default configureStore<StoreType>({
    reducer: {
        search: searchReducer,
        pokemonList: pokemonListReducer,
    },
});

