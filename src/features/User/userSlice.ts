import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { RootState } from '../../app/store';
import { app } from '../../config/config'
import { CredentialType } from "./User.types"
import { User } from '@firebase/auth-types';
import axios from "axios";



const initialState = {
    user: {} as User,
    loginStatus: "idle",
    loginError: '',
};

const auth = getAuth(app);

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loginStatus = "pending";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loginStatus = "success";
                state.loginError = ""
                state.user = action.payload as User
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loginError = action.error.message! + '. Please try again.'
                state.loginStatus = "rejected";
            })
    },
});

export const registerUser = createAsyncThunk("user/login", async (creds: CredentialType) => {
    const user = await createUserWithEmailAndPassword(auth, creds.email, creds.password)
    const toDosAPI = await axios.get('https://jsonplaceholder.cypress.io/todos?_limit=5')
    let toDos = []
    for (let i = 0; i < toDosAPI.data.length; i++) {
        toDos.push({
            id: toDosAPI.data[i].id,
            title: toDosAPI.data[i].title,
            completed: toDosAPI.data[i].completed,
            createdAt: new Date().toISOString(),
            remindAt: new Date().toISOString()
        })
    }
    let data ={
        userId: user.user.uid,
        toDos: toDos
    }
    await addDoc(collection(getFirestore(), "users"),data)
    return user.user
});
export const loginUser = createAsyncThunk("user/login", async (creds: CredentialType) => {
    const user = await signInWithEmailAndPassword(auth, creds.email, creds.password)
    return user.user
});


export const selectUser = ((state: RootState) => state.persistedReducer.userStore.user)
export const selectAuthError = ((state: RootState) => state.persistedReducer.userStore.loginError)

export default userSlice.reducer;