import React, { useEffect, useState } from "react";
import { transactionService } from "../../services/transaction";
import type { Transaction } from "../../types";
import TransactionTable from "../../components/transactions/TransactionList";

const TransactionsPage: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("date");
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

	// Filter + sort applied locally
	const filtered = transactions.filter(
		(tx) =>
			tx.description?.toLowerCase().includes(search.toLowerCase()) ||
			tx.reference.toLowerCase().includes(search.toLowerCase())
	);
	const sorted = [...filtered].sort((a, b) => {
		if (sortBy === "date")
			return (
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime()
			);
		if (sortBy === "amount") return b.amount - a.amount;
		if (sortBy === "status") return a.status.localeCompare(b.status);
		if (sortBy === "type") return a.type.localeCompare(b.type);
		return 0;
	});

	return (
		<div className="p-6">
			<TransactionTable
				transactions={sorted}
				title="Transactions"
				showControls
				search={search}
				setSearch={setSearch}
				sortBy={sortBy}
				setSortBy={setSortBy}
				page={page}
				setPage={setPage}
				totalPages={totalPages}
				loading={loading}
			/>
		</div>
	);
};

export default TransactionsPage;
