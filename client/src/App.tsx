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
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

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
						<ProtectedRoute>
							<Layout title="Dashboard" showGreeting>
								<Dashboard />
							</Layout>
						</ProtectedRoute>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/invoices"
					element={
						<ProtectedRoute>
							<Layout
								title="Invoices"
								subtitle="Manage your invoices">
								<InvoicesPage />
							</Layout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/cards"
					element={
						<ProtectedRoute>
							<Layout
								title="Cards"
								subtitle="Your cards overview">
								<CardsPage />
							</Layout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/wallets"
					element={
						<ProtectedRoute>
							<Layout title="Wallets" subtitle="Your wallets">
								<WalletsPage />
							</Layout>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/transactions"
					element={
						<ProtectedRoute>
							{" "}
							<Layout
								title="Transactions"
								subtitle="Your recent activity">
								<TransactionsPage />
							</Layout>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
