import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

type LoginFormData = {
	email: string;
	password: string;
};

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate();

	const loginMutation = useMutation({
		mutationFn: (data: LoginFormData) =>
			axios.post("/api/auth/login", data),
		onSuccess: (response) => {
			// Store tokens and user data
			localStorage.setItem("token", response.data.token);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			localStorage.setItem(
				"user",
				JSON.stringify(response.data.data.user)
			);

			// Redirect to dashboard
			navigate("/dashboard");
		},
		onError: (error: any) => {
			setLoginError(error.response?.data?.message || "Login failed");
		},
	});

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
				</div>
				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="rounded-md shadow-sm space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								id="email"
								type="email"
								autoComplete="email"
								{...register("email", {
									required: "Email is required",
								})}
								className={`mt-1 block w-full px-3 py-2 border ${
									errors.email
										? "border-red-300"
										: "border-gray-300"
								} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								type="password"
								autoComplete="current-password"
								{...register("password", {
									required: "Password is required",
								})}
								className={`mt-1 block w-full px-3 py-2 border ${
									errors.password
										? "border-red-300"
										: "border-gray-300"
								} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
							/>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					{loginError && (
						<div className="rounded-md bg-red-50 p-4">
							<div className="flex">
								<div className="ml-3">
									<h3 className="text-sm font-medium text-red-800">
										{loginError}
									</h3>
								</div>
							</div>
						</div>
					)}

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900">
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<Link
								to="/forgot-password"
								className="font-medium text-indigo-600 hover:text-indigo-500">
								Forgot your password?
							</Link>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loginMutation.isPending}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
							{loginMutation.isPending
								? "Signing in..."
								: "Sign in"}
						</button>
					</div>
				</form>
				<div className="text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/register"
							className="font-medium text-indigo-600 hover:text-indigo-500">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
