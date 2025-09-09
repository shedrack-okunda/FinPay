import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, UserPlus } from "lucide-react";
import { invoiceService } from "../../services/invoice";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	open: boolean;
	onClose: () => void;
};

const NewInvoiceDrawer = ({ open, onClose }: Props) => {
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState<{
		customerName: string;
		customerEmail: string;
		billingAddress: string;
		dueDate: string;
		total: number;
	}>({
		customerName: "",
		customerEmail: "",
		billingAddress: "",
		dueDate: "",
		total: 0,
	});

	const qc = useQueryClient();

	useEffect(() => {
		if (!open) {
			setStep(1);
			setForm({
				customerName: "",
				customerEmail: "",
				billingAddress: "",
				dueDate: "",
				total: 0,
			});
		}
	}, [open]);

	const handleNext = () => {
		if (step === 1) {
			if (!form.customerName || !form.customerEmail) {
				alert("Please provide customer name and email");
				return;
			}
			setStep(2);
		}
	};

	const handleBack = () => setStep((s) => Math.max(1, s - 1));

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const payload = {
				customerName: form.customerName,
				customerEmail: form.customerEmail,
				billingAddress: form.billingAddress,
				dueDate: form.dueDate,
				total: form.total,
			};

			await invoiceService.createInvoice(payload);

			// refresh invoice list
			qc.invalidateQueries({ queryKey: ["invoices"] });

			onClose();
		} catch (err) {
			console.error(err);
			alert("Failed creating invoice");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={`fixed inset-y-0 right-0 z-50 transform bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 ${
				open ? "translate-x-0" : "translate-x-full"
			}`}
			style={{ width: "min(100%, 600px)" }}>
			{/* Header */}
			<div className="p-4 flex items-center justify-between border-b">
				<div>
					<div className="flex gap-4 items-center">
						<h3 className="text-lg font-semibold">New Invoice</h3>
						<p className="text-md border p-1 rounded text-gray-500">
							Step {step}/2
						</p>
					</div>
					<p className="text-sm text-gray-500">
						Fill out invoice details below
					</p>
				</div>
				<button
					onClick={() => onClose()}
					className="p-2 rounded-md hover:bg-gray-100">
					<X className="h-5 w-5" />
				</button>
			</div>

			{/* Body */}
			<div className="p-6 overflow-y-auto h-full">
				{step === 1 && (
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Customer Name
							</label>
							<input
								value={form.customerName}
								onChange={(e) =>
									setForm({
										...form,
										customerName: e.target.value,
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								placeholder="John Doe"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Customer Email
							</label>
							<input
								value={form.customerEmail}
								onChange={(e) =>
									setForm({
										...form,
										customerEmail: e.target.value,
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								placeholder="john@example.com"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Billing Address
							</label>
							<textarea
								value={form.billingAddress}
								onChange={(e) =>
									setForm({
										...form,
										billingAddress: e.target.value,
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								placeholder="123 Street, City, Country"
							/>
						</div>

						<button className="flex items-center gap-2 px-4 py-2 border rounded-md text-indigo-600 hover:bg-indigo-50">
							<UserPlus className="h-5 w-5" />
							Create new customer
						</button>

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
						<div>
							<label className="block text-sm font-medium text-gray-700">
								Invoice Total
							</label>
							<input
								type="number"
								value={form.total}
								onChange={(e) =>
									setForm({
										...form,
										total: Number(e.target.value),
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
								placeholder="0.00"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700">
								Due Date
							</label>
							<input
								type="date"
								value={form.dueDate}
								onChange={(e) =>
									setForm({
										...form,
										dueDate: e.target.value,
									})
								}
								className="mt-1 block w-full border rounded-md p-2"
							/>
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

export default NewInvoiceDrawer;
