import React from "react";
import { formatCurrency } from "../../utils/formatters";

interface Props {
	currency: string;
	balance: number;
	isActive: boolean;
}

const WalletCard: React.FC<Props> = ({ currency, balance, isActive }) => {
	return (
		<div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
			<div>
				<h3 className="text-lg font-bold">{currency} Wallet</h3>
				<p className="text-gray-600">Balance</p>
			</div>
			<div className="mt-4">
				<p className="text-2xl font-bold">
					{formatCurrency(balance, currency)}
				</p>
				<p
					className={`text-sm ${
						isActive ? "text-green-600" : "text-red-600"
					}`}>
					{isActive ? "Active" : "Inactive"}
				</p>
			</div>
		</div>
	);
};

export default WalletCard;
