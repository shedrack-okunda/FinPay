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
							<div className="p-6 bg-white rounded-lg shadow">
								<p>Invoices page (to be implemented)</p>
							</div>
						</Layout>
					}
				/>
				<Route
					path="/cards"
					element={
						<Layout title="Cards" subtitle="Your cards overview">
							<div className="p-6 bg-white rounded-lg shadow">
								<p>Cards page (to be implemented)</p>
							</div>
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
