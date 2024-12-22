import Home from "./components/homePage.js/home";
import { Route, Routes } from "react-router";
import Login from "./components/homePage.js/logIn";
import Register from "./components/homePage.js/register";
import TaskManager from "./Task-Manager";

export default function App() { 
    
    return <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/manager" element={<TaskManager/>}/>
        </Routes>
}