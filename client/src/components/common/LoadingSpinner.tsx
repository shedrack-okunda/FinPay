import React from "react";

const LoadingSpinner: React.FC = () => {
	return (
		<div className="flex items-center justify-center py-12">
			<div className="h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
};

export default LoadingSpinner;
