import React from "react";
import { Bell } from "lucide-react";
import WelcomeSection from "../dashboard/WelcomeSection";
import QuickActions from "../dashboard/QuickActions";

interface HeaderProps {
	title: string;
	subtitle?: string;
	showGreeting?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showGreeting }) => {
	return (
		<header className="bg-white border-b border-[#D0D5DD] shadow-sm w-full h-[110px] flex items-center px-6">
			<div className="flex items-center justify-between w-full">
				{/* Left side */}
				<div>
					{showGreeting ? (
						<WelcomeSection />
					) : (
						<>
							<h1 className="text-lg md:text-2xl font-semibold text-gray-900">
								{title}
							</h1>
						</>
					)}
				</div>

				{/* Right side */}
				<div className="flex items-center space-x-4">
					{/* Quick Actions → hidden on small, visible on md+ */}
					<div className="hidden md:block">
						<QuickActions />
					</div>

					{/* Notifications */}
					<button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-200">
						<Bell className="h-6 w-6 text-black" />
						<span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
