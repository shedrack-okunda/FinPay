import React from "react";
import { Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import WelcomeSection from "../dashboard/WelcomeSection";

interface HeaderProps {
	title: string;
	subtitle?: string;
	showGreeting?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, showGreeting }) => {
	const { user } = useAuth();

	return (
		<header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<div>
					{showGreeting ? (
						<WelcomeSection />
					) : (
						<>
							<h1 className="text-2xl font-semibold text-gray-900">
								{title}
							</h1>
							{subtitle && (
								<p className="text-sm text-gray-600 mt-1">
									{subtitle}
								</p>
							)}
						</>
					)}
				</div>

				<div className="flex items-center space-x-4">
					{/* Notifications */}
					<button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
						<Bell className="h-6 w-6" />
						<span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
					</button>

					{/* User dropdown */}
					<div className="relative">
						<button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-colors">
							<div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
								<span className="text-sm font-medium text-indigo-600">
									{user?.firstName?.[0]}
									{user?.lastName?.[0]}
								</span>
							</div>
							<ChevronDown className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
