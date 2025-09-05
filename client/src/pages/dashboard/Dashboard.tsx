import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
// import { io, Socket } from "socket.io-client";

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

// ✅ Safe localStorage parser
function getStoredUser() {
	try {
		const stored = localStorage.getItem("user");
		if (!stored || stored === "undefined") return null;
		return JSON.parse(stored);
	} catch {
		return null;
	}
}

export default function Dashboard() {
	// const [socket, setSocket] = useState<Socket | null>(null);
	const [greeting, setGreeting] = useState("");
	const [currentTime, setCurrentTime] = useState(new Date());

	const { data, isLoading, error, refetch } = useQuery<DashboardData>({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const response = await axios.get("/api/dashboard/stats");
			return response.data;
		},
	});

	const user = getStoredUser();

	useEffect(() => {
		// Set up greeting based on time of day
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 18) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");

		// Set up real-time clock
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Socket setup will come later
		// const newSocket = io(import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:5000");
		// setSocket(newSocket);

		return () => {
			clearInterval(timer);
			// newSocket.disconnect();
		};
	}, [refetch]);

	if (isLoading) return <LoadingSpinner />;
	if (error) return <div>Error loading dashboard data</div>;

	return (
		<div className="p-6">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					{greeting}, {user?.firstName || "User"}!
				</h1>
				<p className="text-gray-600 mt-2">
					{format(currentTime, "EEEE, MMMM do yyyy")} • Have a great
					day!
				</p>
			</div>

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
