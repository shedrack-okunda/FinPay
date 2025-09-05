import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { cardService } from "../../services/card";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	open: boolean;
	onClose: () => void;
};

const cardTypes = ["virtual", "physical"] as const;
const cardBrands = ["visa", "mastercard"] as const;
const currencies = ["USD", "NGN", "EUR", "GBP"];

const NewCardDrawer = ({ open, onClose }: Props) => {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<{
		cardName: string;
		cardType: "virtual" | "physical";
		cardBrand: "visa" | "mastercard";
		currency: "USD" | "NGN" | "EUR" | "GBP";
		fee: number;
		wallet: string;
	}>({
		cardName: "",
		cardType: "virtual",
		cardBrand: "visa",
		currency: "USD",
		fee: 0,
		wallet: "", // later if you fetch wallets
	});

	const qc = useQueryClient();

	useEffect(() => {
		if (!open) {
			// reset state when closed
			setStep(1);
		}
	}, [open]);

	const handleNext = () => {
		if (step === 1) {
			// basic validation
			if (!form.cardName) return alert("Please enter card name");
			setStep(2);
			return;
		}
	};

	const handleBack = () => setStep((s) => Math.max(1, s - 1));

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const payload = {
				cardName: form.cardName,
				cardType: form.cardType,
				cardBrand: form.cardBrand,
				currency: form.currency,
			};

			await cardService.createCard(payload);

			// ✅ properly invalidate cards query
			qc.invalidateQueries({ queryKey: ["cards"] });

			onClose();
		} catch (err) {
			console.error(err);
			alert("Failed creating card");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`fixed inset-y-0 right-0 z-50 transform bg-white border-l border-[#D0D5DD] shadow-lg transition-transform duration-300 ${
				open ? "translate-x-0" : "translate-x-full"
			}`}
			style={{ width: "min(100%, 600px)" }}>
			<div className="p-4 flex items-center justify-between border-b">
				<div>
					<div className="flex gap-4 items-center">
						<h3 className="text-lg font-semibold">New Card</h3>
						<p className="text-md border p-1 rounded hover:bg-gray-200 border-[#D0D5DD] text-gray-500">
							Step {step}/2
						</p>
					</div>
					<p className="text-sm text-gray-500">
						Please note that funds on this card cannot be withdrawn.
					</p>
				</div>

				<div className="flex items-center space-x-2">
					<button
						onClick={() => onClose()}
						className="p-2 rounded-md hover:bg-gray-100">
						<X className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div className="p-6 overflow-y-auto h-full">
				{step === 1 && (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Card name
							</label>
							<input
								value={form.cardName}
								onChange={(e) =>
									setForm({
										...form,
										cardName: e.target.value,
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								placeholder="My Travel Card"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Card type
							</label>
							<select
								value={form.cardType}
								onChange={(e) =>
									setForm({
										...form,
										cardType: e.target.value as
											| "virtual"
											| "physical",
									})
								}
								className="mt-1 block w-full border rounded-md p-2">
								{cardTypes.map((t) => (
									<option key={t} value={t}>
										{t}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Card brand
							</label>
							<select
								value={form.cardBrand}
								onChange={(e) =>
									setForm({
										...form,
										cardBrand: e.target.value as
											| "visa"
											| "mastercard",
									})
								}
								className="mt-1 block w-full border rounded-md p-2">
								{cardBrands.map((b) => (
									<option key={b} value={b}>
										{b}
									</option>
								))}
							</select>
						</div>

						<div className="flex justify-end">
							<button
								onClick={handleNext}
								className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md">
								Continue <ArrowRight />
							</button>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="space-y-4">
						<p className="text-sm text-gray-500">Your card fee</p>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Card fee (auto)
							</label>
							<input
								value={form.fee}
								onChange={(e) =>
									setForm({
										...form,
										fee: Number(e.target.value),
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								type="number"
								placeholder="Auto-calculated"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Debited from (wallet)
							</label>
							<select
								value={form.currency}
								onChange={(e) =>
									setForm({
										...form,
										currency: e.target.value as
											| "USD"
											| "NGN"
											| "EUR"
											| "GBP",
									})
								}
								className="mt-1 block w-full border rounded-md p-2">
								{currencies.map((c) => (
									<option key={c} value={c}>
										{c}
									</option>
								))}
							</select>
						</div>

						<div>
							<p className="text-sm text-gray-600">
								Total:{" "}
								{form.fee
									? `${form.fee} ${form.currency}`
									: `— ${form.currency}`}
							</p>
						</div>

						<div className="flex justify-between">
							<button
								onClick={handleBack}
								className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-md">
								<ArrowLeft /> Back
							</button>

							<button
								onClick={handleSubmit}
								disabled={loading}
								className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md">
								{loading ? "Creating..." : "Submit"}{" "}
								<ArrowRight />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NewCardDrawer;
