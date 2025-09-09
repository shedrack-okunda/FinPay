import { ChevronUp, ChevronDown, Eye, EyeOff, FileText } from "lucide-react";
import { useState } from "react";

export const WalletBalanceCard = ({
	currency,
	balance,
}: {
	currency: string;
	balance: number;
}) => {
	const [showBalance, setShowBalance] = useState(true);

	return (
		<div className="bg-white rounded-2xl shadow p-0 flex flex-col overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between bg-gray-50 px-6 py-3 border-b">
				<div className="flex items-center gap-2">
					<img
						src={`https://flagcdn.com/${currency
							.slice(0, 2)
							.toLowerCase()}.svg`}
						alt={currency}
						className="h-6 w-6 rounded"
					/>
					<h3 className="text-medium font-semibold text-gray-800">
						{currency} ({currency === "USD" ? "$" : currency})
					</h3>
				</div>
				<div className="flex items-center border rounded bg-white">
					<p className="text-xs px-2">Switch</p>
					<div className="flex flex-col">
						<button className="p-1 hover:bg-gray-100 rounded">
							<ChevronUp className="h-3 w-3" />
						</button>
						<button className="p-1 hover:bg-gray-100 rounded">
							<ChevronDown className="h-3 w-3" />
						</button>
					</div>
				</div>
			</div>

			{/* Balance */}
			<div className="px-6 py-6">
				<p className="text-2xl font-bold mt-2">
					{showBalance ? `$${balance.toLocaleString()}` : "••••••"}
				</p>
				<button
					onClick={() => setShowBalance((s) => !s)}
					className="flex items-center gap-1 text-xs text-indigo-700 mt-6 hover:text-gray-700 border rounded p-1">
					{showBalance ? "Wallet Balance" : "Show Balance"}

					{showBalance ? (
						<EyeOff className="h-4 w-4" />
					) : (
						<Eye className="h-4 w-4" />
					)}
				</button>
			</div>

			{/* Footer */}
			<div className="mt-auto flex justify-end px-6 py-3">
				<button className="flex items-center gap-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-2 rounded-md hover:bg-indigo-100">
					<FileText className="h-4 w-4" />
					Account Statement
				</button>
			</div>
		</div>
	);
};

export const ReceivingAccountCard = () => {
	return (
		<div className="bg-white rounded-2xl shadow p-0 flex flex-col overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between bg-gray-50 px-6 py-3 border-b">
				<h3 className="text-medium font-semibold text-gray-800">
					Receiving Account
				</h3>
				<button className="text-xs text-indigo-600 bg-white border rounded px-1 py-1 hover:bg-gray-100">
					View details →
				</button>
			</div>

			{/* Body */}
			<div className="px-6 py-5 flex flex-col gap-3">
				<div>
					<p className="font-medium text-gray-800">Elijah Nnabufie</p>
					<span className="text-sm text-gray-500">
						Account Holder
					</span>
				</div>

				<hr />
				<div>
					<p className="text-gray-800 text-sm">
						WELLS FARGO BANK, N.A.
					</p>
					<span className="text-sm text-gray-500">Bank Name</span>
				</div>
				<hr />

				<div>
					<p className="text-gray-800 font-mono text-sm">
						40630101689676683
					</p>
					<span className="text-sm text-gray-500">
						Account Number
					</span>
				</div>
			</div>
		</div>
	);
};

export const ExpensesCard = () => {
	return (
		<div className="bg-white rounded-2xl shadow p-0 overflow-hidden">
			{/* Header */}
			<div className="bg-gray-50 px-6 py-3 border-b">
				<h3 className="text-medium font-semibold text-gray-800">
					Expenses
				</h3>
			</div>

			{/* Body */}
			<div className="px-6 py-6">
				<div className="flex justify-between text-lg">
					<div>
						<p className="font-bold">$0.00</p>
						<span className="text-sm text-gray-600">Income</span>
					</div>
					<div>
						<p className="font-bold">$0.00</p>
						<span className="text-sm text-gray-600"> Expenses</span>
					</div>
				</div>
				<div className="mt-4 border h-10 w-full rounded bg-gray-200 border-gray-50"></div>

				<div className="mt-6 flex justify-center gap-6">
					<span className="flex items-center gap-2">
						<span className="h-3 w-3 rounded-full bg-purple-600" />
						Income
					</span>
					<span className="flex items-center gap-2">
						<span className="h-3 w-3 rounded-full bg-pink-500" />
						Expenses
					</span>
				</div>
			</div>
		</div>
	);
};
