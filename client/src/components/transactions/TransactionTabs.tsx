import React from "react";

export type TransactionTab =
	| "all"
	| "pending"
	| "processing"
	| "completed"
	| "failed";

const tabs: { key: TransactionTab; label: string }[] = [
	{ key: "all", label: "All Transactions" },
	{ key: "pending", label: "Pending" },
	{ key: "processing", label: "Processing" },
	{ key: "completed", label: "Completed" },
	{ key: "failed", label: "Failed" },
];

interface Props {
	activeTab: TransactionTab;
	setActiveTab: (tab: TransactionTab) => void;
}

const TransactionTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<div className="overflow-x-auto">
			<div className="flex flex-row gap-4 bg-gray-50 p-2 rounded-lg min-w-max">
				{tabs.map((t) => (
					<button
						key={t.key}
						onClick={() => setActiveTab(t.key)}
						className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
							activeTab === t.key
								? "bg-indigo-600 text-white"
								: "bg-white text-gray-600 border hover:bg-gray-100"
						}`}>
						{t.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default TransactionTabs;
