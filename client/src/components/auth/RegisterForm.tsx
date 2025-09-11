import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

interface RegisterFormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const RegisterForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { register: registerUser } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const password = watch("password");

	const onSubmit = async (data: RegisterFormData) => {
		setLoading(true);
		try {
			await registerUser({
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				password: data.password,
			});
			toast.success("Account created successfully!");
			navigate("/dashboard");
		} catch (error: any) {
			toast.error(error.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create your FinPay account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Join thousands of users managing their finances
					</p>
				</div>

				<form
					className="mt-8 space-y-6"
					onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="firstName"
									className="block text-sm font-medium text-gray-700">
									First Name
								</label>
								<input
									{...register("firstName", {
										required: "First name is required",
									})}
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
									placeholder="John"
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.firstName.message}
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor="lastName"
									className="block text-sm font-medium text-gray-700">
									Last Name
								</label>
								<input
									{...register("lastName", {
										required: "Last name is required",
									})}
									type="text"
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
									placeholder="Doe"
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">
										{errors.lastName.message}
									</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								{...register("email", {
									required: "Email is required",
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: "Invalid email address",
									},
								})}
								type="email"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
								placeholder="john.doe@example.com"
							/>
							{errors.email && (
								<p className="mt-1 text-sm text-red-600">
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
							<div className="mt-1 relative">
								<input
									{...register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message:
												"Password must be at least 6 characters",
										},
									})}
									type={showPassword ? "text" : "password"}
									className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() =>
										setShowPassword(!showPassword)
									}>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="mt-1 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700">
								Confirm Password
							</label>
							<div className="mt-1 relative">
								<input
									{...register("confirmPassword", {
										required:
											"Please confirm your password",
										validate: (value) =>
											value === password ||
											"Passwords do not match",
									})}
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
									placeholder="Confirm your password"
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() =>
										setShowConfirmPassword(
											!showConfirmPassword
										)
									}>
									{showConfirmPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400" />
									) : (
										<Eye className="h-5 w-5 text-gray-400" />
									)}
								</button>
							</div>
							{errors.confirmPassword && (
								<p className="mt-1 text-sm text-red-600">
									{errors.confirmPassword.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
							{loading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								"Create Account"
							)}
						</button>
					</div>

					<div className="text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								to="/login"
								className="font-medium text-primary-600 hover:text-primary-500">
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
