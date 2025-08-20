import React from "react";
import { PlusCircle, Send, Repeat } from "lucide-react";

const QuickActions: React.FC = () => {
	const actions = [
		{ icon: <Send className="h-5 w-5" />, label: "Send Money" },
		{ icon: <PlusCircle className="h-5 w-5" />, label: "Fund Wallet" },
		{ icon: <Repeat className="h-5 w-5" />, label: "Convert" },
	];

	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h3 className="text-lg font-medium mb-4">Quick Actions</h3>
			<div className="flex flex-col gap-3">
				{actions.map((action, idx) => (
					<button
						key={idx}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition">
						{action.icon}
						<span>{action.label}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default QuickActions;
