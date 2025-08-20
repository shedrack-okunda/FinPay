import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle?: string;
	showGreeting?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
	children,
	title,
	subtitle,
	showGreeting,
}) => {
	return (
		<div className="flex h-screen bg-gray-50">
			<Sidebar />

			<div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
				<Header
					title={title}
					subtitle={subtitle}
					showGreeting={showGreeting}
				/>

				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
