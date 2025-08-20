import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Navigate to="/dashboard" replace />}
				/>
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
							<div className="p-6 bg-white rounded-lg shadow">
								<p>Wallets page (to be implemented)</p>
							</div>
						</Layout>
					}
				/>
				<Route
					path="/transactions"
					element={
						<Layout
							title="Transactions"
							subtitle="Your recent activity">
							<div className="p-6 bg-white rounded-lg shadow">
								<p>Transactions page (to be implemented)</p>
							</div>
						</Layout>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
