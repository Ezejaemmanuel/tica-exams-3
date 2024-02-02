import { getUserRoleFromCacheOrPrisma } from "@/app/api/userInfo/cache";
import { currentUser } from "@clerk/nextjs";
import { EmailAddress, auth } from "@clerk/nextjs/server";
import { $Enums, Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { User } from "@clerk/nextjs/server";

// type AuthSession = {
//   session: {
//     user: {
//       id: string;
//       name?: string;
//       email?: string;
//     };
//   } | null;
// };

// export const getUserAuth = async () => {
//   const { userId } = auth();
//   if (userId) {
//     return {
//       session: {
//         user: {
//           id: userId,
//         },
//       },
//     } as AuthSession;
//   } else {
//     return { session: null };
//   }
// };
export const getUserId = () => {
  const { userId } = auth();
  return userId;
}
// export const checkAuth = async () => {
//   const { userId } = auth();
//   if (!userId) redirect("/sign-in");
// };

// export const getUserAuthInfo = async () => {
//   const user = await currentUser();
//   if (user) {
//     return user;

//   }
//   throw new Error("No User Logged In");
// }
type AuthSession = {
  session: {
    user: {
      id: string;
      name: string | null;
      email?: EmailAddress;
      role?: $Enums.Role | null;
      image: string
    };
  } | null;
};
function getPrimaryEmail(emails: EmailAddress[], primaryId: string | null): EmailAddress | undefined {
  const primaryEmail = emails.find(email => email.id === primaryId);
  if (!primaryEmail) {
    console.log("there is no primary email here ")
    return emails[0];

  }
  return primaryEmail;
}
export const getUserAuth = async (): Promise<AuthSession> => {
  // const { userId } = auth();
  const session = await currentUser();
  // console.log("thsi is the sesion that would be manually added to the database ", session);

  if (session) {
    const role = await getUserRoleFromCacheOrPrisma(session.id);

    return {
      session: {
        user: {
          id: session.id,
          // role: string;
          name: session.username,
          email: getPrimaryEmail(session.emailAddresses, session.primaryEmailAddressId),
          role: role,
          image: session.imageUrl,

        },
      },
    };
  } else {
    return { session: null };
  }
};

export const checkAuthPermission = async (role: 'All' | 'only_superadmin' | 'only_admin_and_superadmin') => {
  const { session } = await getUserAuth();
  console.log("this is the user session", session);

  if (!session) {
    redirect("/sign-in");
  } else {
    let errorMessage;

    switch (role) {
      case 'All':
        // Allow all authenticated users
        // break;
        break;
      case 'only_superadmin':
        if (session.user.role !== Role.SUPERADMIN) {
          errorMessage = 'YOU ARE NOT AUTHORIZED TO ACCESS THIS PAGE';
          throw new Error(errorMessage);

        }
        break;
      case 'only_admin_and_superadmin':
        if (session.user.role !== 'ADMIN' && session.user.role !== Role.SUPERADMIN) {

          errorMessage = 'YOU ARE NOT AUTHORIZED TO ACCESS THIS PAGE';
          console.log(errorMessage)
          throw new Error(errorMessage);

        }
        break;

      default:
        errorMessage = 'Invalid role';
    }

    if (errorMessage) {
      // redirect(`/blocked?error=${encodeURIComponent(errorMessage)}`);
      throw new Error(errorMessage);
    }
  }
};