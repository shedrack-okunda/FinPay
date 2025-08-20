import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	LayoutDashboard,
	FileText,
	CreditCard,
	Wallet,
	ArrowUpDown,
	User,
	LogOut,
	Menu,
	X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const navigation = [
		{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
		{ name: "Invoices", href: "/invoices", icon: FileText },
		{ name: "Cards", href: "/cards", icon: CreditCard },
		{ name: "Wallets", href: "/wallets", icon: Wallet },
		{ name: "Transactions", href: "/transactions", icon: ArrowUpDown },
	];

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const isActive = (path: string) => location.pathname === path;

	return (
		<>
			{/* Mobile menu button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<button
					onClick={() => setIsMobileOpen(!isMobileOpen)}
					className="p-2 rounded-md bg-white shadow-lg">
					{isMobileOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Mobile overlay */}
			{isMobileOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
				{/* Logo */}
				<div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
					<h1 className="text-2xl font-bold text-primary-600">
						FinPay
					</h1>
				</div>

				{/* Navigation */}
				<nav className="mt-6 px-3">
					<div className="space-y-1">
						{navigation.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									to={item.href}
									onClick={() => setIsMobileOpen(false)}
									className={`
                    group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                    ${
						isActive(item.href)
							? "bg-primary-100 text-primary-700 border-r-2 border-primary-700"
							: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
					}
                  `}>
									<Icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</div>
				</nav>

				{/* User profile section */}
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
					<div className="flex items-center space-x-3 mb-3">
						<div className="flex-shrink-0">
							{user?.avatar ? (
								<img
									className="h-10 w-10 rounded-full"
									src={user.avatar}
									alt={`${user.firstName} ${user.lastName}`}
								/>
							) : (
								<div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
									<User className="h-6 w-6 text-primary-600" />
								</div>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 truncate">
								{user?.firstName} {user?.lastName}
							</p>
							<p className="text-xs text-gray-500 truncate">
								@{user?.finpayTag}
							</p>
						</div>
					</div>
					<button
						onClick={handleLogout}
						className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
						<LogOut className="mr-3 h-4 w-4" />
						Sign out
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
