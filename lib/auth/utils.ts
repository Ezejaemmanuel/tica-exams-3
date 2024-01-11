import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  } | null;
};

export const getUserAuth = async () => {
  const { userId } = auth();
  if (userId) {
    return {
      session: {
        user: {
          id: userId,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};
export const getUserId = () => {
  const { userId } = auth();
  return userId;
}
export const checkAuth = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
};

export const getUserAuthInfo = async () => {
  const user = await currentUser();
  if (user) {
    return user;

  }
  throw new Error("No User Logged In");
}