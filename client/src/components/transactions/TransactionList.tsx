import React from "react";
import { format } from "date-fns";
import type { Transaction } from "../../types";

interface Props {
	transactions: Transaction[];
	title?: string;
	showControls?: boolean;
	search?: string;
	setSearch?: (v: string) => void;
	sortBy?: string;
	setSortBy?: (v: string) => void;
	page?: number;
	setPage?: (p: number) => void;
	totalPages?: number;
	loading?: boolean;
}

const TransactionTable: React.FC<Props> = ({
	transactions,
	title = "Transactions",
	showControls = false,
	search,
	setSearch,
	sortBy,
	setSortBy,
	page,
	setPage,
	totalPages,
	loading = false,
}) => {
	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h2 className="text-xl font-bold mb-4">{title}</h2>

			{showControls && (
				<div className="flex items-center mb-4 space-x-4">
					<input
						type="text"
						placeholder="Search for a transaction"
						value={search}
						onChange={(e) => setSearch?.(e.target.value)}
						className="w-full md:w-1/3 p-2 border rounded-lg"
					/>
					<select
						value={sortBy}
						onChange={(e) => setSortBy?.(e.target.value)}
						className="p-2 border rounded-lg">
						<option value="date">Sort by Date</option>
						<option value="amount">Sort by Amount</option>
						<option value="status">Sort by Status</option>
						<option value="type">Sort by Type</option>
					</select>
				</div>
			)}

			{loading ? (
				<p className="text-gray-500">Loading...</p>
			) : (
				<table className="min-w-full text-sm">
					<thead className="border-b">
						<tr>
							<th className="text-left p-3">Date</th>
							<th className="text-left p-3">Description</th>
							<th className="text-left p-3">Amount</th>
							<th className="text-left p-3">Status</th>
							<th className="text-left p-3">Type</th>
						</tr>
					</thead>
					<tbody>
						{transactions.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="p-6 text-center text-gray-500">
									No transactions found
								</td>
							</tr>
						) : (
							transactions.map((tx) => (
								<tr
									key={tx.reference}
									className="border-b hover:bg-gray-50">
									<td className="p-3">
										{format(
											new Date(tx.createdAt),
											"MMM d, yyyy"
										)}
									</td>
									<td className="p-3">
										{tx.description || tx.type}
									</td>
									<td
										className={`p-3 font-bold ${
											tx.type === "receive"
												? "text-green-600"
												: "text-red-600"
										}`}>
										{tx.type === "receive" ? "+" : "-"}{" "}
										{tx.amount} {tx.currency}
									</td>
									<td className="p-3 capitalize">
										{tx.status}
									</td>
									<td className="p-3 capitalize">
										{tx.type}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			)}

			{showControls && totalPages && totalPages > 1 && (
				<div className="flex justify-between items-center p-4">
					<button
						disabled={page === 1}
						onClick={() => setPage?.(Math.max(1, (page ?? 1) - 1))}
						className="px-4 py-2 border rounded-lg disabled:opacity-50">
						Prev
					</button>
					<p>
						Page {page} of {totalPages}
					</p>
					<button
						disabled={page === totalPages}
						onClick={() => setPage?.((page ?? 1) + 1)}
						className="px-4 py-2 border rounded-lg disabled:opacity-50">
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default TransactionTable;
