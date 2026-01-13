// src/screens/home/HomeLoggedView.tsx
import { HeaderLogged } from "@/src/components/HeaderLogged/HeaderLogged";
import { PromoBanner } from "@/src/components/Home/Banner/PromoBanner/PromoBanner";
import { QuickActions } from "@/src/components/Home/QuickActions/QuickActions";
import { UnlockBenefitsCard } from "@/src/components/Home/UnlockBenefitsCard/UnlockBenefitsCard";
import { SafeAreaView, ScrollView } from "react-native";

export function HomeLoggedView() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderLogged />

      <ScrollView showsVerticalScrollIndicator={false}>
        <QuickActions />
        <PromoBanner />
        <UnlockBenefitsCard />
      </ScrollView>
    </SafeAreaView>
  );
}
