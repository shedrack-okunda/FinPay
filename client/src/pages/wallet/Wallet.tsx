import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import {
	ExpensesCard,
	ReceivingAccountCard,
	WalletBalanceCard,
} from "../../components/wallets/WalletCard";
import QuickActions from "../../components/dashboard/QuickActions";

interface Wallet {
	currency: string;
	balance: number;
	isActive: boolean;
}

const WalletsPage: React.FC = () => {
	const { isLoading: walletsLoading } = useQuery<{
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
			<QuickActions variant="inline" />

			{/* Wallet summary cards */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<WalletBalanceCard currency="USD" balance={1267} />

				{/* Receiving Account */}
				<ReceivingAccountCard />

				{/* Expenses */}
				<ExpensesCard />
			</div>

			{/* Recent Transactions */}
			<RecentTransactions />
		</div>
	);
};

export default WalletsPage;
