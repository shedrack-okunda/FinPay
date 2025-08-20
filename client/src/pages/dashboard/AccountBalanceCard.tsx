import { useState } from "react";
import { Currency } from "../../types";

type AccountBalanceCardProps = {
	balances: {
		USD: number;
		GBP: number;
		EUR: number;
		NGN: number;
	};
};

export default function AccountBalanceCard({
	balances,
}: AccountBalanceCardProps) {
	const [activeCurrency, setActiveCurrency] = useState<Currency>("USD");

	const formatBalance = (balance: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: activeCurrency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(balance);
	};

	return (
		<div className="bg-white rounded-lg shadow p-6">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-medium text-gray-900">
					Account Balance
				</h2>
				<div className="flex space-x-2">
					{(["USD", "GBP", "EUR", "NGN"] as Currency[]).map(
						(currency) => (
							<button
								key={currency}
								onClick={() => setActiveCurrency(currency)}
								className={`px-3 py-1 text-sm rounded-md ${
									activeCurrency === currency
										? "bg-indigo-600 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-gray-200"
								}`}>
								{currency}
							</button>
						)
					)}
				</div>
			</div>
			<div className="text-3xl font-bold mb-2">
				{formatBalance(balances[activeCurrency])}
			</div>
			<div className="grid grid-cols-4 gap-4 mt-6">
				{(["USD", "GBP", "EUR", "NGN"] as Currency[]).map(
					(currency) => (
						<div key={currency} className="text-center">
							<div className="text-sm text-gray-500">
								{currency}
							</div>
							<div className="font-medium">
								{new Intl.NumberFormat("en-US", {
									style: "currency",
									currency,
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}).format(balances[currency])}
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}
