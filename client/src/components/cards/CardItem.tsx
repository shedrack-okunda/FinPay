import React from "react";
import { CreditCard } from "lucide-react";

interface Props {
	onCreate: () => void;
}

const CardItem: React.FC<Props> = ({ onCreate }) => {
	return (
		<div className="bg-white rounded-lg border border-[#D0D5DD] shadow-sm w-full max-w-[556px] h-[407px] p-6 flex flex-col">
			{/* Title with underline */}
			<div className="border-b border-gray-200 pb-3">
				<h3 className="text-xl font-semibold">Cards</h3>
			</div>

			{/* Illustration */}
			<div className="flex-1 flex flex-col items-center justify-center mt-6">
				<div className="w-48 h-48 flex items-center justify-center">
					<img
						src="/src/assets/images/credit.svg"
						alt="lady holding card"
						className="max-w-full max-h-full object-contain"
					/>
				</div>
			</div>

			<hr className="my-4 border-gray-200" />

			{/* Create button */}
			<div className="flex  justify-center">
				<button
					onClick={onCreate}
					className="flex items-center font-bold justify-center w-full gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
					<CreditCard className="h-6 w-6" />
					Create new card
				</button>
			</div>
		</div>
	);
};

export default CardItem;
