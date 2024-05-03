import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:4000/api/user/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const json = await response.json();
                setIsLoading(false);
                setError(json.error); 
                return; 
            }

            const json = await response.json();
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        } catch (error) {
            setError("Signup failed");
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};


