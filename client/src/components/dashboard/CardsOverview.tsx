import React from "react";
import type { Card } from "../../types";

interface Props {
	cards: Card[];
}

const CardsOverview: React.FC<Props> = ({ cards }) => {
	return (
		<div className="bg-white rounded-2xl shadow p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				My Cards
			</h3>
			{cards.length === 0 ? (
				<p className="text-gray-500 text-sm">No cards available.</p>
			) : (
				<ul className="space-y-3">
					{cards.map((card) => (
						<li
							key={card.cardName}
							className="flex justify-between border rounded-lg p-3 hover:bg-primary-50 hover:border-primary-200 transition">
							<div>
								<p className="font-medium text-gray-900">
									{card.cardName}
								</p>
								<p className="text-sm text-gray-500">
									{card.cardBrand.toUpperCase()} •{" "}
									{card.currency}
								</p>
							</div>
							<div className="font-bold text-primary-600">
								{card.balance} {card.currency}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CardsOverview;
