import React, { useState } from "react";
import { PlusCircle, Search } from "lucide-react";

interface Invoice {
	id: string;
	customer: string;
	amount: number;
	status: "draft" | "pending" | "processing" | "paid" | "due" | "overdue";
	dueDate: string;
}

const statuses = [
	"all",
	"draft",
	"pending",
	"processing",
	"paid",
	"due",
	"overdue",
] as const;

export default function InvoicesPage() {
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] =
		useState<(typeof statuses)[number]>("all");
	const [invoices, setInvoices] = useState<Invoice[]>([]);
    console.log(setInvoices)

	// Filter invoices
	const filtered = invoices.filter((inv) => {
		const matchesSearch =
			inv.customer.toLowerCase().includes(search.toLowerCase()) ||
			inv.id.toLowerCase().includes(search.toLowerCase());
		const matchesStatus =
			activeTab === "all" ? true : inv.status === activeTab;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="p-6 space-y-6">
			{/* Search bar */}
			<div className="flex items-center gap-3">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search invoices..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
					/>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex gap-4 border-b border-gray-200">
				{statuses.map((status) => (
					<button
						key={status}
						onClick={() => setActiveTab(status)}
						className={`pb-2 capitalize ${
							activeTab === status
								? "border-b-2 border-primary-600 text-primary-600 font-medium"
								: "text-gray-500 hover:text-gray-700"
						}`}>
						{status}
					</button>
				))}
			</div>

			{/* Table or empty state */}
			{filtered.length === 0 ? (
				<div className="flex flex-col items-center justify-center text-gray-500 py-16">
					<p className="mb-4">No payments yet.</p>
					<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
						Create new invoice
					</button>
				</div>
			) : (
				<div className="overflow-x-auto bg-white rounded-xl shadow">
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr className="bg-gray-50 text-left text-sm font-medium text-gray-600">
								<th className="px-6 py-3">Invoice ID</th>
								<th className="px-6 py-3">Customer</th>
								<th className="px-6 py-3">Amount</th>
								<th className="px-6 py-3">Status</th>
								<th className="px-6 py-3">Due Date</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 text-sm">
							{filtered.map((inv) => (
								<tr key={inv.id}>
									<td className="px-6 py-4 font-mono">
										{inv.id}
									</td>
									<td className="px-6 py-4">
										{inv.customer}
									</td>
									<td className="px-6 py-4">
										${inv.amount.toFixed(2)}
									</td>
									<td className="px-6 py-4 capitalize">
										{inv.status}
									</td>
									<td className="px-6 py-4">{inv.dueDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* Floating action button */}
			{filtered.length > 0 && (
				<div className="flex justify-end">
					<button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
						<PlusCircle className="h-4 w-4 mr-2" />
						Create new invoice
					</button>
				</div>
			)}
		</div>
	);
}
