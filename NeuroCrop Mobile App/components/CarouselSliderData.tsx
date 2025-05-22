import { ImageSourcePropType } from "react-native";

export type ImageSliderType = {
  title: string;
  image: ImageSourcePropType;
  description: string;
};

export const teamMembers = [
  {
    image: require("@/assets/images/ronit.jpeg"),
    title: "Ronit",
    description: "AI Specialist",
  },
  {
    image: require("@/assets/images/jack.jpeg"),
    title: "Jack",
    description: "Lead Developer & UI/UX Specialist",
  },
  {
    image: require("@/assets/images/arnav.jpeg"),
    title: "Arnav",
    description: "Lead Developer & UI/UX Specialist",
  },
  {
    image: require("@/assets/images/corbin.jpeg"),
    title: "Corbin",
    description: "Team Manager & Product Marketer",
  },
];
