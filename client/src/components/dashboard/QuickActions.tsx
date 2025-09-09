import React, { useState, useRef, useEffect } from "react";
import {
	PlusCircle,
	Send,
	Repeat,
	FileText,
	X,
	ChevronDown,
} from "lucide-react";

type QuickActionsProps = {
	variant?: "dropdown" | "inline"; // dropdown = header, inline = dashboard
};

const QuickActions: React.FC<QuickActionsProps> = ({
	variant = "dropdown",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement | null>(null);

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const actions = [
		{
			icon: <Send className="h-5 w-5 text-indigo-700" />,
			label: "Send Money",
		},
		{
			icon: <PlusCircle className="h-5 w-5 text-indigo-700" />,
			label: "Fund Wallet",
		},
		{
			icon: <Repeat className="h-5 w-5 text-indigo-700" />,
			label: "Convert Funds",
		},
		{
			icon: <FileText className="h-5 w-5 text-indigo-700" />,
			label: "Create Invoice",
		},
	];

	//  Inline mode for dashboard
	if (variant === "inline") {
		return (
			<div className="flex gap-3">
				{actions
					.filter((a) =>
						["Send Money", "Convert Funds"].includes(a.label)
					)
					.map((action, idx) => (
						<button
							key={idx}
							className="flex font-bold items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-indigo-700 hover:bg-gray-100 bg-gray-200 transition">
							{action.icon}
							<span>{action.label}</span>
						</button>
					))}
			</div>
		);
	}

	//  Dropdown mode for header
	return (
		<div className="relative" ref={modalRef}>
			{/* Trigger button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center py-2 px-2 border-1 border-[#D0D5DD] rounded-md bg-[#FFFFFF] text-black font-bold hover:bg-gray-200  transition">
				<ChevronDown className="mr-2 h-4 w-4" />
				Quick Actions
			</button>

			{/* Dropdown Modal */}
			{isOpen && (
				<div
					className="absolute right-0 mt-2 w-[216px] bg-white border border-[#D0D5DD] rounded-lg shadow-md p-4 z-50"
					style={{ boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)" }}>
					{/* Header with Close button */}
					<div className="flex justify-between items-center mb-3">
						<h3 className="text-sm font-semibold text-gray-900">
							Quick Actions
						</h3>
						<button
							onClick={() => setIsOpen(false)}
							className="text-gray-400 hover:text-gray-600">
							<X className="h-4 w-4" />
						</button>
					</div>

					{/* Actions List */}
					<div className="flex flex-col gap-2">
						{actions.map((action, idx) => (
							<React.Fragment key={idx}>
								<button className="flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition">
									{action.icon}
									<span className="font-semibold">
										{action.label}
									</span>
								</button>
								{idx < actions.length - 1 && (
									<hr className="border-t border-gray-200" />
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default QuickActions;
