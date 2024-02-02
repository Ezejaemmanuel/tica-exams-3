import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid place-items-center pt-4">
      <SignIn afterSignInUrl={"/sync-user"} afterSignUpUrl={"/sync-user"} />
    </main>
  );
}