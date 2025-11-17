import axios, { HttpStatusCode } from "axios";
import { createContext, useContext, useState } from "react";



export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

    const client = axios.create({
        baseURL: "http://localhost:8000/api/users"
    })

    const [userData, setUserData] = useState(null);

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })

            if (request.status === 201) {
                return request.data.message;
            }
        } catch (err) {
            throw err;
        }
    }

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", { username, password });

            if (request.status === 200) {
                localStorage.setItem("token", request.data.token);
                return "Login Successful";
            }
        } catch (err) {
            throw err;
        }
    };




    const data = {
        userData, setUserData, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
