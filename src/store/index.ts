import { configureStore } from '@reduxjs/toolkit';
import searchReducer, { type StoreType as SearchStoreType } from './searchSlice';
export type StoreType = {
    search: SearchStoreType
}
export default configureStore<StoreType>({
    reducer: {
        search: searchReducer,
    },
});

