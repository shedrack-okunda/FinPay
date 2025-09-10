import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CreditCard, Landmark } from "lucide-react";

// Components
import AccountBalanceCard from "../../components/dashboard/AccountBalanceCard";
import QuickActions from "../../components/dashboard/QuickActions";
import InvoicesSummary from "../../components/dashboard/InvoicesSummary";
import ExchangeRatesWidget from "../../components/dashboard/ExchangeRatesWidget";
import CardsOverview from "../../components/dashboard/CardsOverview";
import NewInvoiceDrawer from "../../components/invoices/NewInvoiceDrawer";
import NewCardDrawer from "../../components/cards/NewCardDrawer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import type { Card } from "../../types";

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
	const [openInvoiceDrawer, setOpenInvoiceDrawer] = useState(false);
	const [openCardDrawer, setOpenCardDrawer] = useState(false);

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
				<div className="bg-white rounded-2xl shadow">
					<div className="border-b w-full px-6 py-4">
						<h3 className="text-lg font-semibold text-gray-700">
							Receive Payments
						</h3>
					</div>

					<div className="flex items-center gap-4 px-6 py-4">
						<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
						<div>
							<p className="text-gray-900 font-medium">
								US Dollars
							</p>
							<p className="text-sm text-gray-500">
								Bank of America • Account No: 123456789 • SWIFT:
								BOFAUS3N
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4 px-6 py-4">
						<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
						<div>
							<p className="text-gray-900 font-medium">
								British Pounds
							</p>
							<p className="text-sm text-gray-500">
								Barclays UK • Account No: 987654321 • SWIFT:
								BARCGB22
							</p>
						</div>
					</div>

					<div className="flex items-center gap-4 px-6 py-4">
						<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
						<div>
							<p className="text-gray-900 font-medium">Euros</p>
							<p className="text-sm text-gray-500">
								Deutsche Bank • IBAN: DE89370400440532013000 •
								SWIFT: DEUTDEFF
							</p>
						</div>
					</div>
				</div>

				{/* Invoices */}
				<div className="bg-white rounded-2xl shadow p-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							Invoices
						</h3>
						<button
							onClick={() => setOpenInvoiceDrawer(true)}
							className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
							Create Invoice
						</button>
					</div>
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

			{/* Row 3: Exchange Rates + Cards */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ExchangeRatesWidget
					rates={
						data?.exchangeRates?.USD || { GBP: 0, EUR: 0, NGN: 0 }
					}
				/>

				<div className="bg-white rounded-2xl shadow p-6">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold flex items-center gap-2">
							<CreditCard className="h-5 w-5 text-indigo-600" />
							My Cards
						</h3>
						<button
							onClick={() => setOpenCardDrawer(true)}
							className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
							Create Card
						</button>
					</div>
					<CardsOverview cards={data?.cards || []} />
				</div>
			</div>

			{/* Drawers */}
			<NewInvoiceDrawer
				open={openInvoiceDrawer}
				onClose={() => setOpenInvoiceDrawer(false)}
			/>
			<NewCardDrawer
				open={openCardDrawer}
				onClose={() => setOpenCardDrawer(false)}
			/>
		</div>
	);
}
