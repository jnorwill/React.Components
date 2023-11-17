import { createSlice } from '@reduxjs/toolkit';
const storedSearchValue = localStorage.getItem('searchValue') || '';

export type StoreType = {
    value: string;
}

const initialState: StoreType = { value: storedSearchValue }

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        saveSearchValue: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { saveSearchValue } = searchSlice.actions;
export default searchSlice.reducer;

