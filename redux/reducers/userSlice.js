import { createSlice } from '@reduxjs/toolkit';
import { createUser, loginUser, updateUser } from '../actions/index';

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
            state.user = payload?.user;
            state.token = payload?.token;
        },
        // login
        [loginUser.pending]: (state, action) => {
            state.loading = true;
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = true;
        },
        [loginUser.fulfilled]: (state, action) => {
            const { payload } = action;
            state.loading = false;
            state.error = true;
            state.user = payload?.user;
            state.token = payload?.token;
        },
        [updateUser.pending]: (state, action) => {
            state.loading = true;
        },
        // [updateUser.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = true;
        // },
        [updateUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = true;
            state.user = null;
            state.token = null;
        },
    },

})

export const { increment } = counterSlice.actions;

export default counterSlice.reducer;