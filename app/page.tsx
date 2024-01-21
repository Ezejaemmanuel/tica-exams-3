import Header from "@/components/homePage/HeroSection";
import RegistrationGuide from "@/components/homePage/registrationGuide";
import { getUserAuth } from "@/lib/auth/utils";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const userAuth = await getUserAuth();
  return (
    <main className="">

      <Header />
      <RegistrationGuide />
    </main>
  );
}
