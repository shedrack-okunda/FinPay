import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { invoiceService } from "../../services/invoice";
import type { Invoice } from "../../types";
import InvoiceList from "../../components/invoices/InvoiceList";
import type { InvoiceTab } from "../../components/invoices/InvoiceTabs";
import InvoiceTabs from "../../components/invoices/InvoiceTabs";
import NewInvoiceDrawer from "../../components/invoices/NewInvoiceDrawer";

const InvoicesPage: React.FC = () => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState<InvoiceTab>("all");
	const [statusFilter, setStatusFilter] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [openDrawer, setOpenDrawer] = useState(false);

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				setLoading(true);
				const res = await invoiceService.getInvoices({
					page,
					limit: 5,
					status: activeTab !== "all" ? activeTab : undefined,
				});
				setInvoices(res.invoices);
				setTotalPages(res.totalPages);
			} catch (err) {
				console.error("Failed to load invoices:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchInvoices();
	}, [page, activeTab]);

	// Apply search + filter locally
	const filtered = invoices.filter((inv) => {
		const matchesSearch = inv.customerName
			.toLowerCase()
			.includes(search.toLowerCase());
		const matchesStatus =
			statusFilter === "" ? true : inv.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="p-6 space-y-6">
			{/* Search & Filter controls */}
			<div className="flex flex-row sm:flex-row items-center sm:items-stretch gap-4 sm:gap-[19px] w-full max-w-[974px] h-auto sm:h-[56px] mt-4">
				{/* Search Input */}
				<div className="relative flex-1 min-w-[220px] h-[50px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search invoices..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full h-full pl-10 pr-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					/>
				</div>

				{/* Status Filter */}
				<select
					value={statusFilter}
					onChange={(e) => setStatusFilter(e.target.value)}
					className="h-[50px] px-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full sm:w-[170px] min-w-[100px]">
					<option value="">All Statuses</option>
					<option value="draft">Draft</option>
					<option value="pending">Pending</option>
					<option value="processing">Processing</option>
					<option value="paid">Paid</option>
					<option value="due">Due</option>
					<option value="overdue">Overdue</option>
				</select>
			</div>

			<div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
				{/* Tabs */}
				<div className="border-b-2 border-indigo-500 ">
					<InvoiceTabs
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				</div>

				{/* Table */}
				<InvoiceList
					invoices={filtered}
					loading={loading}
					page={page}
					setPage={setPage}
					totalPages={totalPages}
					activeTab={activeTab}
					onNewInvoice={() => setOpenDrawer(true)}
				/>
			</div>

			<NewInvoiceDrawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
			/>
		</div>
	);
};

export default InvoicesPage;
