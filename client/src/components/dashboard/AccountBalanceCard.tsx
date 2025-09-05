import React from "react";
import type { Wallet } from "../../types";
import { formatCurrency } from "../../utils/formatters";

interface AccountBalanceCardProps {
	balances: {
		USD: number;
		GBP: number;
		EUR: number;
		NGN: number;
	};
}

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
		<div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-blue shadow-lg">
			<h3 className="text-lg font-semibold mb-4">Account Balance</h3>
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
				{wallets.map((wallet) => (
					<div
						key={wallet.currency}
						className="text-center bg-white/10 rounded-lg p-3">
						<p className="text-sm opacity-90">{wallet.currency}</p>
						<p className="text-2xl font-bold">
							{formatCurrency(wallet.balance, wallet.currency)}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default AccountBalanceCard;
