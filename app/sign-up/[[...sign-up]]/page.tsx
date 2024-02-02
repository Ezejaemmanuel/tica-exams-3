import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid place-items-center pt-4">
      <SignUp afterSignInUrl={"/sync-user"} afterSignUpUrl={"/sync-user"} />
    </main>
  );
}