import { createSlice } from '@reduxjs/toolkit';
import { createUser } from '../actions/index';

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: false
}

const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    },
    extraReducers: {
        [createUser.pending]: (state, action) => {
            state.loading = true;
        },
        [createUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [createUser.fulfilled]: (state, action) => {
            const { payload } = action;
            state.loading = false;
            state.error = true;
            state.user = payload.user;
            state.token = payload.token;
        },
    }

})

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;