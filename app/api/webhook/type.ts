export type UserAuthCreateInput = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    username: string | null;
    imageUrl: string | null;
    banned: boolean;
    primaryEmailAddressId: string | null;
    primaryPhoneNumberId: string | null;
    emailAddresses: any; // Replace with the actual type of your emailAddresses field
    phoneNumbers: any; // Replace with the actual type of your phoneNumbers field
    userId: string;
};

export type UserAuthUpdateInput = Partial<UserAuthCreateInput>;
