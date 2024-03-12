export interface SellerRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    sellerName: string;
    sellerId: string;
    tokenKaspi: string;
}

export interface SellerEmailConfirmRequest {
    code: string;
}
