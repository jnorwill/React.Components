import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: { value: '' },
    reducers: {
        saveSearchValue: (state, action) => {

        },
    },
});

export const { saveSearchValue } = searchSlice.actions;
export default searchSlice.reducer;

