import { PaymentConfirmation, User } from "@prisma/client";

export type PaymentConfirmationWithUser = PaymentConfirmation & {
    user: Pick<User, 'id' | 'name' | "officialPhoneOrWhatsappNumber">;
};
