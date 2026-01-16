// src/screens/home/HomeLoggedView.tsx
import { HeaderLogged } from "@/src/components/HeaderLogged/HeaderLogged";
import { PromoBanner } from "@/src/components/Home/Banner/PromoBanner/PromoBanner";
import { QuickActions } from "@/src/components/Home/QuickActions/QuickActions";
import { UnlockBenefitsCard } from "@/src/components/Home/UnlockBenefitsCard/UnlockBenefitsCard";
import { LogoutButton } from "@/src/components/ui/buttons/LogoutButton/LogoutButton";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function HomeLoggedView() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <HeaderLogged />
      <LogoutButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <QuickActions />
        <PromoBanner />
        <UnlockBenefitsCard />
      </ScrollView>
    </SafeAreaView>
  );
}
