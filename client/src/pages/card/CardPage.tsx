import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";

interface Card {
	id: string;
	cardNumber: string;
	holderName: string;
	expiry: string;
}

export default function CardsPage() {
	const [showForm, setShowForm] = useState(false);
	console.log(showForm);

	const { data: cards, isLoading } = useQuery<{ cards: Card[] }>({
		queryKey: ["cards"],
		queryFn: async () => {
			const res = await axios.get("/api/cards");
			return { cards: res.data.cards };
		},
	});

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className="p-6 space-y-8">
			{/* Action button */}
			<div className="flex justify-end">
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
					<PlusCircle className="h-4 w-4 mr-2" />
					Create new card
				</button>
			</div>

			{/* Cards grid */}
			{cards?.cards?.length ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.cards.map((card) => (
						<div
							key={card.id}
							className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
							<div>
								<p className="text-lg font-semibold text-gray-900">
									{card.holderName}
								</p>
								<p className="text-gray-600 text-sm">
									{card.cardNumber}
								</p>
							</div>
							<div className="mt-4">
								<p className="text-sm text-gray-500">Expiry</p>
								<p className="font-medium text-gray-900">
									{card.expiry}
								</p>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center text-gray-500 py-16">
					<p className="mb-4">No cards yet.</p>
					<button
						onClick={() => setShowForm(true)}
						className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
						Create your first card
					</button>
				</div>
			)}
		</div>
	);
}
