import {
  BrowserRouter,
  Routes, 
  Route
 } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./features/User/Register/Register";
import Login from "./features/User/Login/Login";
import EditTodo from "./features/Todo/EditTodo";
import Home from "./features/Home/Home";
import AddTodo from "./features/Todo/AddTodo";
import ProtectedRoutes from './utils/ProtectedRoutes'


function App() {
  return (
    <div>
    <ToastContainer limit={2}/>
    <BrowserRouter>
      <Routes>
      <Route element={<ProtectedRoutes/>}>
              <Route path="/home" element={<Home/>} />
              <Route path="/edit" element={<EditTodo />} />
              <Route path="/add" element={<AddTodo/>} />
        </Route>
        <Route
          path="/"
          element={<Register />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </BrowserRouter >
  </div>
  );
}

export default App;
