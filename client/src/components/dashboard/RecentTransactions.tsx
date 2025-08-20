import React from "react";
import type { Transaction } from "../../types";
import { format } from "date-fns";

interface Props {
	transactions: Transaction[];
}

const RecentTransactions: React.FC<Props> = ({ transactions }) => {
	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
			<ul className="divide-y divide-gray-100">
				{transactions.map((tx) => (
					<li
						key={tx.reference}
						className="py-3 flex justify-between">
						<div>
							<p className="font-medium">
								{tx.description || tx.type}
							</p>
							<p className="text-sm text-gray-500">
								{format(
									new Date(tx.createdAt),
									"MMM d, yyyy • h:mm a"
								)}
							</p>
						</div>
						<div
							className={`font-bold ${
								tx.type === "receive"
									? "text-green-600"
									: "text-red-600"
							}`}>
							{tx.type === "receive" ? "+" : "-"} {tx.amount}{" "}
							{tx.currency}
						</div>
					</li>
				))}
				{transactions.length === 0 && (
					<p className="text-gray-500 text-sm">
						No transactions found.
					</p>
				)}
			</ul>
		</div>
	);
};

export default RecentTransactions;
