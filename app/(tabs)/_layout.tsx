import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,

        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,

        // 🔑 NÃO definir height fixa
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: Platform.OS === "android" ? 6 : 12,
        },

        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="benefits"
        options={{
          title: "Benefícios",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="star.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="send-note"
        options={{
          title: "Enviar nota",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="qrcode.viewfinder" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stores"
        options={{
          title: "Lojas",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="bag.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name="line.3.horizontal" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
