import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { ImageSliderType } from "./CarouselSliderData";

const { width } = Dimensions.get("screen");

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const SliderItem = ({ item, index, scrollX }: Props) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.25, 0, width * 0.25],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>
      <Image source={item.image} style={styles.imageStyle} />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
        locations={[0.3, 0.9]}
        style={styles.background}
      >
        <View style={{ gap: 10, alignItems: "center" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1.5,
    alignSelf: "center",
  },
  description: {
    color: "#fff",
    fontSize: 12,
    letterSpacing: 1.2,
    lineHeight: 17,
    alignSelf: "center",
    textAlign: "center",
  },
  imageStyle: {
    width: 290,
    height: 400,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
  },
  background: {
    position: "absolute",
    height: 400,
    width: 290,
    padding: 40,
    borderRadius: 70,
    justifyContent: "flex-end",
  },
});
