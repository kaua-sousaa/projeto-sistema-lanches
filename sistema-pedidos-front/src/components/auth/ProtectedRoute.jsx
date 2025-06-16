import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiLoader } from 'react-icons/fi';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-100">
                <FiLoader className="animate-spin text-4xl text-teal-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login-page" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;