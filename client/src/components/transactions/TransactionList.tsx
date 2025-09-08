import React from "react";
import { format } from "date-fns";
import type { Transaction } from "../../types";

interface Props {
	transactions: Transaction[];
	title?: string;
	loading?: boolean;
	page?: number;
	setPage?: (p: number) => void;
	totalPages?: number;
}

const TransactionTable: React.FC<Props> = ({
	transactions,
	title = "Recent Transactions",
	loading = false,
	page,
	setPage,
	totalPages,
}) => {
	return (
		<div className="bg-white rounded-lg shadow border border-gray-200 p-4 sm:p-6">
			<h2 className="text-lg sm:text-xl font-bold mb-4">{title}</h2>

			{loading ? (
				<p className="text-gray-500">Loading...</p>
			) : (
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm border border-gray-200 rounded-md">
						<thead className="border-b bg-gray-50">
							<tr>
								<th className="text-left p-3">Date</th>
								<th className="text-left p-3">Sender</th>
								<th className="text-left p-3">Receiver</th>
								<th className="text-left p-3">Amount</th>
								<th className="text-left p-3">Status</th>
								<th className="text-left p-3">Type</th>
							</tr>
						</thead>
						<tbody>
							{transactions.length === 0 ? (
								<tr>
									<td
										colSpan={6}
										className="p-6 text-center text-gray-500">
										No transactions found
									</td>
								</tr>
							) : (
								transactions.map((tx) => (
									<tr
										key={tx.reference}
										className="border-b hover:bg-gray-50 transition-colors">
										{/* Date */}
										<td className="p-3">
											{format(
												new Date(tx.createdAt),
												"MMM d, yyyy"
											)}
										</td>

										{/* Sender */}
										<td className="p-3">
											{tx.fromWallet?.currency ||
												tx.fromWallet?.currency ||
												"—"}
										</td>

										{/* Receiver */}
										<td className="p-3">
											{tx.beneficiaryId?.name || "—"}
										</td>

										{/* Amount */}
										<td
											className={`p-3 font-bold ${
												tx.type === "receive"
													? "text-green-600"
													: "text-red-600"
											}`}>
											{tx.type === "receive" ? "+" : "-"}{" "}
											{tx.amount} {tx.currency}
										</td>

										{/* Status */}
										<td className="p-3 capitalize">
											{tx.status}
										</td>

										{/* Type */}
										<td className="p-3 capitalize">
											{tx.type}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			)}

			{totalPages && totalPages > 1 && (
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
