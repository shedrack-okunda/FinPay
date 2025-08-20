import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";

export default function useSocket() {
	const queryClient = useQueryClient();

	useEffect(() => {
		const socket = io(
			import.meta.env.VITE_APP_SOCKET_URL || "http://localhost:5000"
		);

		// Join user's room
		const user = JSON.parse(localStorage.getItem("user") || "{}");
		if (user._id) {
			socket.emit("join", user._id);
		}

		// Listen for balance updates
		socket.on("balanceUpdate", () => {
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
			queryClient.invalidateQueries({ queryKey: ["wallets"] });
		});

		// Listen for new transactions
		socket.on("newTransaction", (transaction) => {
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["dashboard"] });
		});

		// Listen for new notifications
		socket.on("newNotification", (notification) => {
			queryClient.invalidateQueries({ queryKey: ["notifications"] });
		});

		return () => {
			socket.disconnect();
		};
	}, [queryClient]);
}
