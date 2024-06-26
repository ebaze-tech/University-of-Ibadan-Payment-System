/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function LogoutPage() {
    useEffect(() => {
        async function logout() {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: 'include',
            });
        }
        logout();
    }, []);

    return <Navigate to="/login" />;
}

export default LogoutPage;
