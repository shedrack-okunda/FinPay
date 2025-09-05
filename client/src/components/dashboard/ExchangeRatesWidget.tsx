import React from "react";

interface Props {
	rates: {
		GBP: number;
		EUR: number;
		NGN: number;
	};
}

const ExchangeRatesWidget: React.FC<Props> = ({ rates }) => {
	const entries = Object.entries(rates);

	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Exchange Rates (Base: USD)
			</h3>
			<ul className="space-y-2">
				{entries.map(([currency, rate]) => (
					<li
						key={currency}
						className="flex justify-between text-gray-700 border-b last:border-0 pb-2 last:pb-0">
						<span className="font-medium">USD → {currency}</span>
						<span className="font-bold text-primary-600">
							{rate.toFixed(2)}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ExchangeRatesWidget;
