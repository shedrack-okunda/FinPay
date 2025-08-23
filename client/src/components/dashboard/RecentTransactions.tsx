import React, { useEffect, useState } from "react";
import { transactionService } from "../../services/transaction";
import type { Transaction } from "../../types";
import TransactionTable from "../transactions/TransactionList";

const RecentTransactions: React.FC = () => {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecent = async () => {
			try {
				const res = await transactionService.getTransactions({
					page: 1,
					limit: 5,
				});
				setTransactions(res.transactions);
			} catch (err) {
				console.error("Failed to load recent transactions:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchRecent();
	}, []);

	return (
		<TransactionTable
			transactions={transactions}
			title="Recent Transactions"
			loading={loading}
		/>
	);
};

export default RecentTransactions;
