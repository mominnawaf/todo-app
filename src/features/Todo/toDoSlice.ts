import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    collection,
    where,
    getFirestore,
    query,
    doc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { RootState } from '../../app/store';
import { ToDo, ToDos } from "./toDo.types";
import { nanoid } from "nanoid";
import { toast } from 'react-toastify'

const initialState = {
    toDos: {} as ToDos,
    error: '',
};

const toDoSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.toDos = action.payload
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.error = "Something went Wrong"
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.toDos = action.payload
                toast.success("Deleted")
            })
            .addCase(deleteTodo.rejected, () => {
                toast.error("Something went wrong")
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.toDos = action.payload
                toast.success("Updated")
            })
            .addCase(updateTodo.rejected, () => {
                toast.error("Something went wrong")
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.toDos = action.payload
                toast.success("Added")
            })
            .addCase(addTodo.rejected, () => {
                toast.error("Something went wrong")
            })
    },
});

export const fetchTodo = createAsyncThunk("todo/fetch", async (userId: string) => {
    const q = query(
        collection(getFirestore(), "users"),
        where("userId", "==", userId),
    );
    var data = [] as ToDos
    const snapshot = await getDocs(q)
    snapshot.forEach(snap => {
        data = snap.data().toDos
    })
    return data
});
export const addTodo = createAsyncThunk("todo/add", async ({ title, reminder, userId }: { title: string, reminder: string, userId: string }) => {
    const q = query(
        collection(getFirestore(), "users"),
        where("userId", "==", userId),
    );
    var data = [] as ToDos
    const snapshot = await getDocs(q)
    let id;
    snapshot.forEach(snap => {
        id = snap.id
        data = snap.data().toDos
    })
    data.push({
        id: nanoid(),
        title: title,
        remindAt: reminder,
        createdAt: new Date().toISOString(),
        completed: false
    })
    const ref = doc(getFirestore(), `users/${id}`)
    await updateDoc(ref, {
        toDos: arrayUnion({
            id: nanoid(),
            title: title,
            remindAt: reminder,
            createdAt: new Date().toISOString(),
            completed: false
        }),
    });
    return data
});
export const updateTodo = createAsyncThunk("todo/update", async ({ userId, toDo }: { userId: string, toDo: ToDo }) => {
    const q = query(
        collection(getFirestore(), "users"),
        where("userId", "==", userId),
    );
    var data = [] as ToDos
    const snapshot = await getDocs(q)
    let id;
    snapshot.forEach(snap => {
        id = snap.id
        data = snap.data().toDos
    })
    let index = data.findIndex(d => d.id === toDo.id)
    data[index] = toDo
    const ref = doc(getFirestore(), `users/${id}`)
    await updateDoc(ref, {
        toDos: data
    })
    return data
});
export const deleteTodo = createAsyncThunk("todo/delete", async ({ userId, toDo }: { userId: string, toDo: ToDo }) => {
    const q = query(
        collection(getFirestore(), "users"),
        where("userId", "==", userId),
    );
    var data = [] as ToDos
    const snapshot = await getDocs(q)
    let id;
    snapshot.forEach(snap => {
        id = snap.id
        data = snap.data().toDos
    })
    let a = data.filter(d => d.id !== toDo.id)
    const ref = doc(getFirestore(), `users/${id}`)
    await updateDoc(ref, {
        toDos: arrayRemove(toDo)
    })
    return a
});

export const selectTodo = ((state: RootState) => state.persistedReducer.toDoStore.toDos)

export default toDoSlice.reducer;