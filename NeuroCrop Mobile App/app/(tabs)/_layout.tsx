import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import CustomTabBar from "@/components/CustomTabBar";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="AI"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          tabBarLabel: "AI",
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
          tabBarLabel: "Info",
        }}
      />
    </Tabs>
  );
}
