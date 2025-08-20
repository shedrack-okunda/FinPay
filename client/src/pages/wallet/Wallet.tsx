import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TransactionList from "../../components/transactions/TransactionList";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import WalletCard from "../../components/wallets/WalletCard";

export default function Wallet() {
	const { data: wallets, isLoading: walletsLoading } = useQuery({
		queryKey: ["wallets"],
		queryFn: async () => {
			const response = await axios.get("/api/wallets");
			return response.data.data.wallets;
		},
	});

	const { data: transactions, isLoading: transactionsLoading } = useQuery({
		queryKey: ["transactions"],
		queryFn: async () => {
			const response = await axios.get("/api/transactions");
			return response.data.data.transactions;
		},
	});

	if (walletsLoading || transactionsLoading) return <LoadingSpinner />;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">My Wallets</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
				{wallets?.map((wallet: any) => (
					<WalletCard
						key={wallet._id}
						currency={wallet.currency}
						balance={wallet.balance}
						isActive={wallet.isActive}
					/>
				))}
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<h2 className="text-xl font-semibold mb-4">
					Recent Transactions
				</h2>
				<TransactionList
					transactions={transactions?.slice(0, 5) || []}
				/>
			</div>
		</div>
	);
}
