import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Components
import AccountBalanceCard from "../../components/dashboard/AccountBalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import InvoicesSummary from "../../components/dashboard/InvoicesSummary";
import ExchangeRatesWidget from "../../components/dashboard/ExchangeRatesWidget";
import CardsOverview from "../../components/dashboard/CardsOverview";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import type { Card, Transaction } from "../../types";

type DashboardData = {
	balance: {
		USD: number;
		GBP: number;
		EUR: number;
		NGN: number;
	};
	recentTransactions: Transaction[];
	invoicesSummary: {
		due: number;
		overdue: number;
		awaitingApproval: number;
	};
	exchangeRates: {
		USD: {
			GBP: number;
			EUR: number;
			NGN: number;
		};
	};
	cards: Card[];
};

export default function Dashboard() {
	const { data, isLoading, error } = useQuery<DashboardData>({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const response = await axios.get("/api/dashboard/stats");
			return response.data;
		},
	});

	if (isLoading) return <LoadingSpinner />;
	if (error) return <div>Error loading dashboard data</div>;

	return (
		<div className="p-6">
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div className="lg:col-span-2">
					<AccountBalanceCard
						balances={
							data?.balance || { USD: 0, GBP: 0, EUR: 0, NGN: 0 }
						}
					/>
				</div>
				<div>
					<QuickActions variant="inline" />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div className="lg:col-span-2">
					<RecentTransactions
						transactions={data?.recentTransactions || []}
					/>
				</div>
				<div>
					<InvoicesSummary
						summary={
							data?.invoicesSummary || {
								due: 0,
								overdue: 0,
								awaitingApproval: 0,
							}
						}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ExchangeRatesWidget
					rates={
						data?.exchangeRates?.USD || { GBP: 0, EUR: 0, NGN: 0 }
					}
				/>
				<CardsOverview cards={data?.cards || []} />
			</div>
		</div>
	);
}
