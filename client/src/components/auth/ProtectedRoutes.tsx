import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
	return !!localStorage.getItem("accessToken");
};

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}
	return <>{children}</>;
};

export default ProtectedRoute;
