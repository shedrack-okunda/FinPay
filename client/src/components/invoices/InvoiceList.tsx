import React from "react";
import type { Invoice } from "../../types";
import { FileText } from "lucide-react";

interface Props {
	invoices: Invoice[];
	loading: boolean;
	page: number;
	setPage: (p: number) => void;
	totalPages: number;
	activeTab: string;
}

const InvoiceList: React.FC<Props> = ({
	invoices,
	loading,
	page,
	setPage,
	totalPages,
	activeTab,
}) => {
	if (loading) {
		return <div className="text-gray-500">Loading invoices...</div>;
	}

	if (!loading && invoices.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-gray-500">
				<FileText size={48} className="mb-3 text-gray-400" />
				<p>
					No {activeTab === "all" ? "payments" : activeTab} invoices
					found.
				</p>
				{activeTab === "all" && (
					<button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2">
						New Invoice →
					</button>
				)}
			</div>
		);
	}

	return (
		<div className="overflow-x-auto ">
			<table className="w-full text-left border-collapse">
				<thead className="bg-gray-100">
					<tr>
						<th className="p-3 border-b">Invoice #</th>
						<th className="p-3 border-b">Customer</th>
						<th className="p-3 border-b">Total</th>
						<th className="p-3 border-b">Status</th>
						<th className="p-3 border-b">Due Date</th>
					</tr>
				</thead>
				<tbody>
					{invoices.map((inv) => (
						<tr
							key={inv.invoiceNumber}
							className="border-t hover:bg-gray-50">
							<td className="p-3">{inv.invoiceNumber}</td>
							<td className="p-3">{inv.customerName}</td>
							<td className="p-3">
								{inv.currency} {inv.total.toFixed(2)}
							</td>
							<td className="p-3 capitalize">{inv.status}</td>
							<td className="p-3">
								{new Date(inv.dueDate).toLocaleDateString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="flex justify-between items-center px-4 py-3">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					className="px-4 py-2 border rounded disabled:opacity-50">
					Prev
				</button>
				<span>
					Page {page} of {totalPages}
				</span>
				<button
					disabled={page === totalPages}
					onClick={() => setPage(page + 1)}
					className="px-4 py-2 border rounded disabled:opacity-50">
					Next
				</button>
			</div>
		</div>
	);
};

export default InvoiceList;
