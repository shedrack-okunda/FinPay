import React from "react";
import { useAuth } from "../../hooks/useAuth";

const WelcomeSection = () => {
	const { user } = useAuth();

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12)
			return {
				greeting: "Good morning",
				message: "Have a great time managing your finances.",
			};
		if (hour < 17)
			return {
				greeting: "Good afternoon",
				message:
					"Hope you’re enjoying the way the transaction is smooth.",
			};
		return {
			greeting: "Good evening",
			message: "Thank you for transacting with FinPay.",
		};
	};

	const { greeting, message } = getGreeting();

	return (
		<div className="mb-8">
			<h1 className="text-2xl font-bold text-gray-900">
				{greeting}, {user?.firstName || "User"}!
			</h1>
			<p className="text-gray-600 mt-1">{message}</p>
		</div>
	);
};

export default WelcomeSection;
