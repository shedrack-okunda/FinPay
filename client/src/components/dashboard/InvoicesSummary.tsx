import React, { useState } from "react";
import NewInvoiceDrawer from "../invoices/NewInvoiceDrawer";

interface Props {
	summary: {
		due: number;
		overdue: number;
		awaitingApproval: number;
	};
}

const InvoicesSummary: React.FC<Props> = ({ summary }) => {
	const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);

	const items = [
		{ label: "Due", value: summary.due, color: "text-primary-600" },
		{ label: "Overdue", value: summary.overdue, color: "text-red-600" },
		{
			label: "Awaiting Approval",
			value: summary.awaitingApproval,
			color: "text-yellow-600",
		},
	];

	return (
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			{/* Full-width header */}
			<div className="border-b px-6 py-4">
				<h3 className="text-lg font-semibold text-gray-700">
					Invoices
				</h3>
			</div>

			{/* Body */}
			<div className="p-6">
				<div className="space-y-4">
					{items.map((item, idx) => (
						<div
							key={item.label}
							className={`flex justify-between pb-4 ${
								idx !== items.length - 1 ? "border-b" : ""
							}`}>
							<span className="text-gray-900 text-sm">
								{item.value} Person
							</span>

							<span
								className={`text-xs border px-2 py-1 rounded-full ${item.color}`}>
								{item.label}
							</span>
						</div>
					))}
				</div>

				<div className="flex justify-center w-full">
					<button
						onClick={() => setOpenInvoiceDrawer(true)}
						className="px-4 py-2 text-sm w-full rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 mt-4">
						Create Invoice
					</button>
				</div>
			</div>

			<NewInvoiceDrawer
				open={openInvoiceDrawer}
				onClose={() => setOpenInvoiceDrawer(false)}
			/>
		</div>
	);
};

export default InvoicesSummary;
