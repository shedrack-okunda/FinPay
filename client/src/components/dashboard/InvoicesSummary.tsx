import React from "react";

interface Props {
	summary: {
		due: number;
		overdue: number;
		awaitingApproval: number;
	};
}

const InvoicesSummary: React.FC<Props> = ({ summary }) => {
	const items = [
		{ label: "Due", value: summary.due, color: "text-blue-600" },
		{ label: "Overdue", value: summary.overdue, color: "text-red-600" },
		{
			label: "Awaiting Approval",
			value: summary.awaitingApproval,
			color: "text-yellow-600",
		},
	];

	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h3 className="text-lg font-medium mb-4">Invoices Summary</h3>
			<div className="space-y-2">
				{items.map((item) => (
					<div key={item.label} className="flex justify-between">
						<span>{item.label}</span>
						<span className={`font-bold ${item.color}`}>
							{item.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default InvoicesSummary;
