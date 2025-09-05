import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import CardItem from "../../components/cards/CardItem";
import NewCardDrawer from "../../components/cards/NewCardDrawer";

interface Card {
	id: string;
	cardNumber: string;
	holderName: string;
	expiry: string;
	maskedNumber?: string;
	cardBrand?: string;
}

const fetchCards = async () => {
	const res = await axios.get("/api/cards");
	return res.data.cards as Card[];
};

const CardsPage: React.FC = () => {
	const [open, setOpen] = useState(false);

	const { data: cards, isLoading } = useQuery<Card[]>({
		queryKey: ["cards"],
		queryFn: fetchCards,
	});

	if (isLoading) return <LoadingSpinner />;

	const hasCards = cards && cards.length > 0;

	return (
		<div className="p-6 space-y-8">
			{/* 👇 Show create button on top-right ONLY if cards exist */}
			{hasCards && (
				<div className="flex justify-end">
					<button
						onClick={() => setOpen(true)}
						className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
						<PlusCircle className="h-4 w-4 mr-2" />
						Create new card
					</button>
				</div>
			)}

			<div className="grid grid-cols-1 gap-6">
				{/* 👇 If no cards yet → show placeholder card with create button inside */}
				{!hasCards ? (
					<CardItem onCreate={() => setOpen(true)} />
				) : (
					// 👇 Cards grid when available
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{cards.map((c) => (
							<div
								key={c.id}
								className="bg-white rounded-2xl border p-6 shadow-sm">
								<p className="text-lg font-semibold">
									{c.holderName}
								</p>
								<p className="text-sm text-gray-600">
									{c.maskedNumber ?? c.cardNumber}
								</p>
								<div className="mt-4">
									<p className="text-sm text-gray-500">
										Expiry
									</p>
									<p className="font-medium text-gray-900">
										{c.expiry}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Drawer form */}
			<NewCardDrawer open={open} onClose={() => setOpen(false)} />
		</div>
	);
};

export default CardsPage;
