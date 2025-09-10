import React from "react";

interface CurrencyRate {
	buy: number;
	sell: number;
}

interface Props {
	rates: Record<string, number | CurrencyRate>;
}

const flagMap: Record<string, string> = {
	USD: "https://flagcdn.com/us.svg",
	GBP: "https://flagcdn.com/gb.svg",
	EUR: "https://flagcdn.com/eu.svg",
};

const ExchangeRatesWidget: React.FC<Props> = ({ rates }) => {
	// Normalize: if number → convert to { buy, sell }
	const normalizedEntries: [string, CurrencyRate][] = Object.entries(
		rates
	).map(([currency, value]) => {
		if (typeof value === "number") {
			return [currency, { buy: value, sell: value }];
		}
		return [currency, value as CurrencyRate];
	});

	return (
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			{/* Header */}
			<div className="border-b px-6 py-4">
				<h3 className="text-lg font-semibold text-gray-700">
					Exchange Rates
				</h3>
			</div>

			{/* Body */}
			<div className="p-6">
				{/* Column headers */}
				<div className="flex justify-between text-gray-500 text-sm font-medium mb-2">
					<span className="w-1/3">Currency</span>
					<span className="w-1/3 text-center">Buying</span>
					<span className="w-1/3 text-right">Selling</span>
				</div>

				{/* Rates list */}
				<ul className="divide-y">
					{normalizedEntries.map(([currency, { buy, sell }]) => (
						<li
							key={currency}
							className="flex items-center justify-between py-3">
							{/* Currency + Flag */}
							<div className="flex items-center gap-2 w-1/3">
								<img
									src={flagMap[currency]}
									alt={currency}
									className="w-6 h-6 rounded-full object-cover"
								/>
								<span className="font-medium text-gray-800">
									{currency}
								</span>
							</div>

							{/* Buying */}
							<span className="w-1/3 text-center font-semibold text-green-600">
								{buy.toFixed(2)}
							</span>

							{/* Selling */}
							<span className="w-1/3 text-right font-semibold text-red-600">
								{sell.toFixed(2)}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ExchangeRatesWidget;
