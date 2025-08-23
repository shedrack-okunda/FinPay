import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { transactionService } from "../../services/transaction";
import type { Transaction } from "../../types";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const TransactionsPage: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("date"); // default sort
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchTransactions = async () => {
		try {
			setLoading(true);
			const res = await transactionService.getTransactions({
				page,
				limit: 5,
				// we can pass type/status later if needed
			});
			setTransactions(res.transactions);
			setTotalPages(res.totalPages);
		} catch (err) {
			console.error("Failed to load transactions:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, [page]);

	// Apply search filter locally
	const filtered = transactions.filter(
		(tx) =>
			tx.description?.toLowerCase().includes(search.toLowerCase()) ||
			tx.reference.toLowerCase().includes(search.toLowerCase())
	);

	// Apply sorting
	const sorted = [...filtered].sort((a, b) => {
		if (sortBy === "date") {
			return (
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
			);
		}
		if (sortBy === "amount") {
			return b.amount - a.amount;
		}
		if (sortBy === "status") {
			return a.status.localeCompare(b.status);
		}
		if (sortBy === "type") {
			return a.type.localeCompare(b.type);
		}
		return 0;
	});

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Transactions</h1>

			{/* Search + Filter Row */}
			<div className="flex items-center mb-4 space-x-4">
				<input
					type="text"
					placeholder="Search for a transaction"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full md:w-1/3 p-2 border rounded-lg"
				/>

				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="p-2 border rounded-lg">
					<option value="date">Sort by Date</option>
					<option value="amount">Sort by Amount</option>
					<option value="status">Sort by Status</option>
					<option value="type">Sort by Type</option>
				</select>
			</div>

			{/* Table */}
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className="bg-white rounded-2xl shadow">
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
							{sorted.map((tx) => (
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
									<td className="p-3">
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${
												tx.status === "completed"
													? "bg-green-100 text-green-700"
													: tx.status === "refunded"
													? "bg-gray-200 text-gray-700"
													: tx.status === "failed"
													? "bg-red-100 text-red-700"
													: "bg-yellow-100 text-yellow-700"
											}`}>
											{tx.status}
										</span>
									</td>
									<td className="p-3 capitalize">
										{tx.type}
									</td>
								</tr>
							))}
							{sorted.length === 0 && (
								<tr>
									<td
										colSpan={5}
										className="p-6 text-center text-gray-500">
										No transactions found
									</td>
								</tr>
							)}
						</tbody>
					</table>

					{/* Pagination */}
					<div className="flex justify-between items-center p-4">
						<button
							disabled={page === 1}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							className="px-4 py-2 border rounded-lg disabled:opacity-50">
							Prev
						</button>
						<p>
							Page {page} of {totalPages}
						</p>
						<button
							disabled={page === totalPages}
							onClick={() => setPage((p) => p + 1)}
							className="px-4 py-2 border rounded-lg disabled:opacity-50">
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TransactionsPage;
