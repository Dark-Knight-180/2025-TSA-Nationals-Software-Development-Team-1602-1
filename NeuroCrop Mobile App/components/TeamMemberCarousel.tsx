import React from "react";
import { StyleSheet, View } from "react-native";

export default function TeamMemberCarousel() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  memberName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  memberDescription: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
});
