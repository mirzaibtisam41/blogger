import { createSlice } from '@reduxjs/toolkit';

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
        waitingUserData: (state, action) => {
            state.loading = true;
        },
        addUserData: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            if (token) state.token = token;
            state.loading = false;
            state.error = false
        },
        removeUserData: (state, action) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { addUserData, removeUserData, waitingUserData } = counterSlice.actions;

export default counterSlice.reducer;