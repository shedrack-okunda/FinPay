import { Landmark } from "lucide-react";
import type React from "react";

const ReceivePayments: React.FC = () => {
	return (
		<div className="bg-white rounded-2xl shadow">
			<div className="border-b w-full px-6 py-4">
				<h3 className="text-lg font-semibold text-gray-700">
					Receive Payments
				</h3>
			</div>

			<div className="flex items-center gap-4 px-6 py-4">
				<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
				<div>
					<p className="text-gray-900 font-medium">US Dollars</p>
					<p className="text-sm text-gray-500">
						Bank of America • Account No: 123456789 • SWIFT:
						BOFAUS3N
					</p>
				</div>
			</div>

			<div className="flex items-center gap-4 px-6 py-4">
				<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
				<div>
					<p className="text-gray-900 font-medium">British Pounds</p>
					<p className="text-sm text-gray-500">
						Barclays UK • Account No: 987654321 • SWIFT: BARCGB22
					</p>
				</div>
			</div>

			<div className="flex items-center gap-4 px-6 py-4">
				<Landmark className="h-6 w-6 text-indigo-600 flex-shrink-0" />
				<div>
					<p className="text-gray-900 font-medium">Euros</p>
					<p className="text-sm text-gray-500">
						Deutsche Bank • IBAN: DE89370400440532013000 • SWIFT:
						DEUTDEFF
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReceivePayments;
