import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { transactionService } from "../../services/transaction";
import type { Transaction } from "../../types";
import TransactionTable from "../../components/transactions/TransactionList";

const TransactionsPage: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				setLoading(true);
				const res = await transactionService.getTransactions({
					page,
					limit: 5,
				});
				setTransactions(res.transactions);
				setTotalPages(res.totalPages);
			} catch (err) {
				console.error("Failed to load transactions:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchTransactions();
	}, [page]);

	// Apply search + filter locally
	const filtered = transactions.filter((tx) => {
		const matchesSearch = tx.reference
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesStatus =
			statusFilter === "" ? true : tx.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="p-6 space-y-6">
			{/* Search & Filter controls */}
			<div className="flex flex-row sm:flex-row items-center sm:items-stretch gap-4 sm:gap-[19px] w-full max-w-[974px] h-auto sm:h-[56px] mt-8 ">
				{/* Search Input */}
				<div className="relative flex-1 min-w-[220px] h-[50px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search transactions..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-full pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					/>
				</div>

				{/* Status Filter */}
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="h-[50px] px-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-[170px] min-w-[100px]">
					<option value="">All Statuses</option>
					<option value="completed">Success</option>
					<option value="pending">Pending</option>
					<option value="failed">Failed</option>
					<option value="refunded">Refunded</option>
				</select>
			</div>

			{/* Table */}
			<TransactionTable
				transactions={filtered}
				loading={loading}
				page={page}
				setPage={setPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default TransactionsPage;
