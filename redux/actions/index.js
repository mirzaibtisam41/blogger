import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3000/api';

export const createUser = createAsyncThunk('user', async (obj) => {
    delete obj.confirmpassword;
    const { data } = await axios.post(`${SERVER_URL}/user/create`, obj);
    return data;
});

export const loginUser = createAsyncThunk('userLogin', async (obj) => {
    const { data } = await axios.post(`${SERVER_URL}/user/login`, obj);
    return data;
});

export const updateUser = createAsyncThunk('userUpadte', async ({ obj, options }) => {
    const { data } = await axios.post(`${SERVER_URL}/user/update`, obj, options);
    return data;
});