import React from "react";
import { ArrowLeftRight, Send } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import WalletCard from "../../components/wallets/WalletCard";

interface Wallet {
	currency: string;
	balance: number;
	isActive: boolean;
}

export default function WalletsPage() {
	const { data: wallets, isLoading: walletsLoading } = useQuery<{
		wallets: Wallet[];
	}>({
		queryKey: ["wallets"],
		queryFn: async () => {
			const res = await axios.get("/api/wallets");
			return { wallets: res.data.wallets };
		},
	});

	const { isLoading: txLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const res = await axios.get("/api/transactions");
			return res.data.transactions;
		},
	});

	if (walletsLoading || txLoading) return <LoadingSpinner />;

	return (
		<div className="p-6 space-y-8">
			{/* Quick actions */}
			<div className="flex flex-wrap gap-3">
				<button className="flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200">
					<Send className="h-4 w-4 mr-2" />
					Send Money
				</button>
				<button className="flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200">
					<ArrowLeftRight className="h-4 w-4 mr-2" />
					Convert Funds
				</button>
			</div>

			{/* Wallet summary cards */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{wallets?.wallets?.map((wallet) => (
					<WalletCard
						key={wallet.currency}
						currency={wallet.currency}
						balance={wallet.balance}
						isActive={wallet.isActive}
					/>
				))}

				{/* Receiving Account */}
				<div className="bg-white rounded-2xl shadow p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-gray-700 font-medium">
							Receiving Account
						</h3>
						<button className="text-sm text-primary-600 hover:underline">
							View details →
						</button>
					</div>
					<p className="font-semibold">Elijah Nnabufie</p>
					<p className="text-gray-600 text-sm">
						WELLS FARGO BANK, N.A.
					</p>
					<p className="text-gray-800 font-mono text-sm">
						40630101689676683
					</p>
				</div>

				{/* Expenses */}
				<div className="bg-white rounded-2xl shadow p-6">
					<h3 className="text-gray-700 font-medium mb-4">Expenses</h3>
					<div className="flex justify-between text-lg font-bold">
						<span>$0.00 Income</span>
						<span>$0.00 Expenses</span>
					</div>
					<div className="mt-6 h-24 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
						Chart here
					</div>
					<div className="flex justify-center mt-4 gap-6 text-sm">
						<span className="flex items-center gap-2">
							<span className="h-3 w-3 rounded-full bg-purple-600" />{" "}
							Income
						</span>
						<span className="flex items-center gap-2">
							<span className="h-3 w-3 rounded-full bg-pink-500" />{" "}
							Expenses
						</span>
					</div>
				</div>
			</div>

			{/* Recent Transactions */}
			<RecentTransactions />
		</div>
	);
}
