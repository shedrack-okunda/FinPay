import React, { useEffect, useState } from "react";
import type { User } from "../../types";
import Layout from "../../components/layout/Layout";
import { userService } from "../../services/user";

const ProfilePage: React.FC = () => {
	const [formData, setFormData] = useState<Partial<User>>({});
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true);
				const profile = await userService.getProfile();
				setFormData(profile);
			} catch (err) {
				console.error(err);
				setError("Failed to load profile");
			} finally {
				setLoading(false);
			}
		};
		fetchProfile();
	}, []);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			setError(null);
			const updated = await userService.updateProfile(formData);
			setFormData(updated);
			setSuccess("Profile updated successfully!");
			setTimeout(() => setSuccess(null), 3000);
		} catch (err) {
			console.error(err);
			setError("Failed to update profile");
		} finally {
			setSaving(false);
		}
	};

	if (loading) return <div>Loading profile...</div>;

	return (
		<Layout title="Profile">
			<div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6">
				<h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

				{error && <p className="text-red-500 mb-2">{error}</p>}
				{success && <p className="text-green-600 mb-2">{success}</p>}

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium">
							First Name
						</label>
						<input
							name="firstName"
							value={formData.firstName || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Last Name
						</label>
						<input
							name="lastName"
							value={formData.lastName || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Email
						</label>
						<input
							name="email"
							value={formData.email || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Phone
						</label>
						<input
							name="phone"
							value={formData.phone || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Country
						</label>
						<input
							name="country"
							value={formData.country || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium">
							Address
						</label>
						<textarea
							name="address"
							value={formData.address || ""}
							onChange={handleChange}
							className="mt-1 w-full border rounded-md p-2"
						/>
					</div>
				</div>

				<div className="flex justify-between mt-6">
					<button
						onClick={() => window.history.back()}
						className="px-4 py-2 rounded-md bg-gray-200">
						Back
					</button>
					<button
						onClick={handleSave}
						disabled={saving}
						className="px-4 py-2 rounded-md bg-[#7105E9] text-white">
						{saving ? "Saving..." : "Save"}
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default ProfilePage;
