import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Components
import AccountBalanceCard from "../../components/dashboard/AccountBalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import InvoicesSummary from "../../components/dashboard/InvoicesSummary";
import ExchangeRatesWidget from "../../components/dashboard/ExchangeRatesWidget";
import CardsOverview from "../../components/dashboard/CardsOverview";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import type { Card } from "../../types";
import ReceivePayments from "../../components/dashboard/ReceivePayments";

type DashboardData = {
	balance: {
		ALL: number;
		USD: number;
		GBP: number;
		EUR: number;
		NGN: number;
	};
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
	receivingAccount: {
		bankName: string;
		accountNumber: string;
	};
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
		<div className="p-6 space-y-8">
			{/* Row 1: Account Balance*/}
			<AccountBalanceCard
				balances={
					data?.balance || {
						ALL: 0,
						USD: 0,
						GBP: 0,
						EUR: 0,
						NGN: 0,
					}
				}
			/>

			<div className="mt-6  bg-white rounded-2xl shadow overflow-hidden">
				{/* Full-width header */}
				<div className="border-b w-full px-6 py-4">
					<h3 className="text-lg font-semibold text-gray-700">
						Quick Actions
					</h3>
				</div>

				{/* Body with padding */}
				<div className="p-4 flex justify-center">
					<QuickActions variant="inline-dashboard" />
				</div>
			</div>

			{/* Row 2: Receive Payments + Invoices */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Receive Payments */}
				<ReceivePayments />

				{/* Invoices */}
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

			{/* Row 3: Exchange Rates + Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ExchangeRatesWidget
					rates={
						data?.exchangeRates?.USD || { GBP: 0, EUR: 0, USD: 0 }
					}
				/>

				{/* cards */}
				<CardsOverview cards={data?.cards || []} />
			</div>
		</div>
	);
}
