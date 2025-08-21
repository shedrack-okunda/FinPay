export declare const generateReference: () => string;
export declare const generateFinpayTag: (firstName: string, lastName: string) => Promise<string>;
export declare const generateInvoiceNumber: () => Promise<string>;
export declare const generateTokens: (userId: string, email: string) => {
    accessToken: string;
    refreshToken: string;
};
//# sourceMappingURL=helpers.d.ts.map