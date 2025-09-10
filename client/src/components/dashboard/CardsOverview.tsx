import React, { useState } from "react";
import type { Card } from "../../types";
import { CreditCard } from "lucide-react";
import NewCardDrawer from "../cards/NewCardDrawer";

interface Props {
	cards: Card[];
}

const CardsOverview: React.FC<Props> = ({ cards }) => {
	const [openCardDrawer, setOpenCardDrawer] = useState(false);

	return (
		<div className="bg-white rounded-2xl shadow overflow-hidden">
			<div className="border-b w-full px-6 py-4">
				<h3 className="text-lg font-semibold text-gray-700">Cards</h3>
			</div>

			<div className="flex flex-col justify-center items-center p-6">
				<CreditCard className="h-10 w-10 text-black " />

				<h3 className="text-2xl font-semibold text-gray-900 mb-4">
					No cards yet
				</h3>
				{cards.length === 0 ? (
					<p className="text-gray-500 text-medium">
						Once you create a card, the information appears here .
					</p>
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

				<div className="flex justify-center mt-6 w-full">
					<button
						onClick={() => setOpenCardDrawer(true)}
						className="px-4 py-2 text-medium rounded-lg w-full bg-indigo-600 text-white hover:bg-indigo-700">
						Create Card
					</button>
				</div>
			</div>

			<NewCardDrawer
				open={openCardDrawer}
				onClose={() => setOpenCardDrawer(false)}
			/>
		</div>
	);
};

export default CardsOverview;
