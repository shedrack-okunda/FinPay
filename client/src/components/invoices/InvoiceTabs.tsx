import React from "react";

export type InvoiceTab =
	| "all"
	| "draft"
	| "pending"
	| "processing"
	| "paid"
	| "due"
	| "overdue";

const tabs: { key: InvoiceTab; label: string }[] = [
	{ key: "all", label: "All Invoices" },
	{ key: "draft", label: "Draft" },
	{ key: "pending", label: "Pending" },
	{ key: "processing", label: "Processing" },
	{ key: "paid", label: "Paid" },
	{ key: "due", label: "Due" },
	{ key: "overdue", label: "Overdue" },
];

interface Props {
	activeTab: InvoiceTab;
	setActiveTab: (tab: InvoiceTab) => void;
}

const InvoiceTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
	return (
		<div className="overflow-x-auto scrollbar-hide">
			{/* Responsive: scroll on small screens, span evenly on md+ */}
			<div className="flex w-full md:w-full md:flex">
				{tabs.map((t) => (
					<button
						key={t.key}
						onClick={() => setActiveTab(t.key)}
						className={`px-4 py-2 rounded text-center transition-colors whitespace-nowrap
							${
								activeTab === t.key
									? "bg-indigo-600 text-white"
									: "bg-white text-gray-600 hover:bg-gray-100"
							}
							md:flex-1`}>
						{t.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default InvoiceTabs;
