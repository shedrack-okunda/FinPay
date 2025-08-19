export const generateCardNumber = (brand: string): string => {
	const prefix = brand === "visa" ? "4" : "5";
	let cardNumber = prefix;

	for (let i = 1; i < 16; i++) {
		cardNumber += Math.floor(Math.random() * 10);
	}

	return cardNumber;
};

export const generateCVV = (): string => {
	return Math.floor(100 + Math.random() * 900).toString();
};

export const generateExpiryDate = (): string => {
	const now = new Date();
	const year = now.getFullYear() + 4;
	const month = String(now.getMonth() + 1).padStart(2, "0");
	return `${month}/${year.toString().slice(-2)}`;
};
