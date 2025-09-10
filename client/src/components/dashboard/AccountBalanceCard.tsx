import React from "react";
import type { Wallet } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface AccountBalanceCardProps {
	balances: {
		ALL: number;
		USD: number;
		GBP: number;
		EUR: number;
		NGN: number;
	};
}

const currencyMeta: Record<string, { label: string; emoji: string }> = {
	ALL: { label: "All Accounts", emoji: "💳" },
	USD: { label: "US Dollar", emoji: "🇺🇸" },
	GBP: { label: "British Pound", emoji: "🇬🇧" },
	EUR: { label: "Euro", emoji: "🇪🇺" },
	NGN: { label: "Naira", emoji: "🇳🇬" },
};

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({
	balances,
}) => {
	const wallets: Wallet[] = Object.entries(balances).map(
		([currency, balance]) => ({
			currency: currency as Wallet["currency"],
			balance,
			isActive: true,
		})
	);

	return (
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			{/* Card Header */}
			<div className="border-b w-full px-6 py-4">
				<h3 className="text-lg font-semibold text-gray-700">
					Account Balance
				</h3>
			</div>

			{/* Wallet Grid */}
			<div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
				{wallets.map((wallet) => {
					const meta = currencyMeta[wallet.currency] || {
						label: wallet.currency,
						emoji: "💰",
					};
					return (
						<div
							key={wallet.currency}
							className="bg-gray-50 rounded-xl p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
							{/* Mini-card Header */}
							<div className="w-full border-b flex items-center gap-2  pb-2 mb-3">
								<div className="text-xl">{meta.emoji}</div>
								<p className="text-sm font-medium text-gray-500">
									{meta.label}
								</p>
							</div>

							{/* Mini-card Content */}
							<p className="text-xs text-gray-500">
								Available Balance
							</p>
							<p className="text-xl font-bold text-gray-800 mt-1">
								{formatCurrency(
									wallet.balance,
									wallet.currency
								)}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AccountBalanceCard;
