import React from "react";
import { useAuth } from "../../hooks/useAuth";

const WelcomeSection = () => {
	const { user } = useAuth();

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 17) return "Good afternoon";
		return "Good evening";
	};

	return (
		<div className="mb-8">
			<h1 className="text-3xl font-bold text-gray-900">
				{getGreeting()}, {user?.firstName}!
			</h1>
			<p className="text-gray-600 mt-1">
				Have a great day managing your finances
			</p>
		</div>
	);
};

export default WelcomeSection;
