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

const Sidebar: React.FC = () => {
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
			<div className="lg:hidden fixed top-17 left-4 z-50">
				<button
					onClick={() => setIsMobileOpen(!isMobileOpen)}
					className="p-2 rounded-md bg-[#7105E9] text-white shadow-lg">
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
    fixed inset-y-0 left-0 z-50 w-[295px] bg-[#7105E9] border-r border-gray-200 rounded-r-[19px]
    text-white shadow-lg transform transition-transform duration-300 ease-in-out
    lg:translate-x-0 lg:static lg:h-auto sm:h-auto
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `}>
				{/* Logo */}
				<div className="flex items-center justify-center h-27 px-6 border-b border-white">
					<h1 className="text-2xl font-bold">FinPay</h1>
				</div>

				{/* Close button (mobile only) */}
				<div className="absolute top-4 right-4 lg:hidden">
					<button onClick={() => setIsMobileOpen(false)}>
						<X className="h-6 w-6 text-white" />
					</button>
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
                    group flex items-center px-3 py-2 text-1xl font-semibold rounded-md transition-colors
                    ${
						isActive(item.href)
							? "bg-indigo-100 text-indigo-700"
							: "text-indigo-100 hover:bg-indigo-500 hover:text-white"
					}
                  `}>
									<Icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</div>
				</nav>

				{/* User profile */}
				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white">
					<div className="flex items-center space-x-3 mb-3">
						<div className="flex-shrink-0">
							{user?.avatar ? (
								<img
									className="h-12 w-12 rounded-full"
									src={user.avatar}
									alt={`${user.firstName} ${user.lastName}`}
								/>
							) : (
								<div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
									<User className="h-6 w-6 text-indigo-600" />
								</div>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-1xl font-medium text-white truncate">
								{user?.firstName || "John"}{" "}
								{user?.lastName || "Doe"}
							</p>
							<p className="text-sm text-indigo-200 truncate">
								{user?.email || "johndoe@email.com"}
							</p>
						</div>
					</div>
					<button
						onClick={handleLogout}
						className="w-full flex items-center px-3 py-2 text-1xl text-indigo-100 hover:bg-indigo-500 rounded-md transition-colors font-bold">
						<LogOut className="mr-3 h-6 w-6" />
						Sign out
					</button>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
