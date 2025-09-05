import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import TransactionsPage from "./pages/transaction/Transaction";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import WalletsPage from "./pages/wallet/Wallet";
import CardsPage from "./pages/card/CardPage";
import InvoicesPage from "./pages/invoices/InvoicePage";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>

				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route
					path="/dashboard"
					element={
						<Layout title="Dashboard" showGreeting>
							<Dashboard />
						</Layout>
					}
				/>

				<Route
					path="/invoices"
					element={
						<Layout
							title="Invoices"
							subtitle="Manage your invoices">
						<InvoicesPage/>
						</Layout>
					}
				/>
				<Route
					path="/cards"
					element={
						<Layout title="Cards" subtitle="Your cards overview">
							<CardsPage />
						</Layout>
					}
				/>
				<Route
					path="/wallets"
					element={
						<Layout title="Wallets" subtitle="Your wallets">
							<WalletsPage />
						</Layout>
					}
				/>
				<Route
					path="/transactions"
					element={
						<Layout
							title="Transactions"
							subtitle="Your recent activity">
							<TransactionsPage />
						</Layout>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
