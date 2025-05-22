import Colors from "@/constants/Colors";
import Numbers from "@/constants/Numbers";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import TabButton from "./TabButton";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index, {
      duration: Numbers.animatedIconBGDuration,
    });
  }, [state]); // Dependency array includes "count"

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View onLayout={onTabbarLayout} style={styles.tab_bar}>
      <Animated.View
        style={[
          animatedStyle,
          {
            position: "absolute",
            backgroundColor: Colors.animatedIconBG,
            borderRadius: 30,
            marginHorizontal: "5.0%",
            width: "23%",
            height: "150%",
            bottom: 5,
          },
        ]}
      ></Animated.View>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // tabPositionX.value = withSpring(buttonWidth * index, {
          //   duration: Numbers.animatedIconBGDuration,
          // });
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? Colors.tabActiveTint : Colors.tabInactiveTint}
            label={label}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab_bar: {
    position: "absolute",
    bottom: "0%", //Bottom of the tab bar
    marginBottom: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.tabBarBG,
    marginHorizontal: 30, //Margin between tab bar sides and screen sides

    paddingVertical: 15, //Vertical padding between buttons and edge of the tab bar
    borderRadius: 35, //Rounds corners of the tab bar, smaller number equals more sharp
  },
});
