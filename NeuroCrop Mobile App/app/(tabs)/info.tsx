import CarouselSlider from "@/components/CarouselSlider";
import { teamMembers } from "@/components/CarouselSliderData";
import ChallengesFeatureCard from "@/components/ChallengesFeatureCard";
import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

// List of agricultural challenges to display as feature cards
const challenges = [
  {
    title: "Soil Degration and Erosion",
    description:
      "Intensive farming depletes soil nutrients, reducing long-term productivity.",
    iconName: "trending-down",
  },
  {
    title: "Pests & Crop Diseases",
    description:
      "Farmers lose billions due to pests and diseases, often relying on excessive pesticides.",
    iconName: "alert-triangle",
  },
  {
    title: "Biodiversity Loss & Pollinator Decline",
    description:
      "The decline of pollinators (like bees) and loss of crop diversity threaten global food security.",
    iconName: "twitter",
  },
  {
    title: "Carbon Footprint & Sustainable Practices",
    description:
      "Agriculture is currently a major contributor to greenhouse gas emissions.",
    iconName: "cloud",
  },
  {
    title: "Climate Change",
    description:
      "Unpredictable weather patterns, droughts, floods, and wildfires damage crops and reduce yields.",
    iconName: "sun",
  },
  {
    title: "Water Scarcity & Irrigation Efficiency",
    description:
      "Overuse of water and inefficient irrigation lead to shortages, increasing costs and reducing yields.",
    iconName: "droplet",
  },
];

export default function InfoScreen() {
  // Animated value for scroll position
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: "#fff" }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Hero section with animated image and overlay */}
        <View style={styles.heroContainer}>
          <Animated.Image
            source={{
              uri: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
            }}
            style={[
              styles.heroImage,
              { transform: [{ translateY: Animated.multiply(scrollY, 0.2) }] },
            ]}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <View style={styles.whiteBlurOverlay} />
          <Animated.View
            style={[
              styles.heroContent,
              { transform: [{ translateY: Animated.multiply(scrollY, 0.1) }] },
            ]}
          >
            <Text style={styles.heroTitle}>
              Addressing the Challenges Of{" "}
              <Text style={{ color: "#4CAF50" }}>Modern Agriculture </Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              Agriculture today faces unprecedented challenges, from climate
              change to resource depletion. NeuroCrop was built to provide
              solutions to these growing concerns.
            </Text>
            <Text style={styles.teamText}>Bridgeland Team #2002-2</Text>
          </Animated.View>
        </View>
        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>
            There are many{" "}
            <Text style={[styles.featuresTitle, { color: "#ff0000" }]}>
              Challenges{" "}
              <Text style={[styles.featuresTitle, { color: "#000" }]}>
                Facing Farmers Today
              </Text>
            </Text>
          </Text>
          <Text style={styles.featuresSubtitle}>
            Everything you need to make informed agricultural decisions based on
            data, not guesswork.
          </Text>
          {/* Grid of challenge feature cards */}
          <View style={styles.featuresGrid}>
            {challenges.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <ChallengesFeatureCard
                  title={feature.title}
                  description={feature.description}
                  iconName={feature.iconName}
                />
              </View>
            ))}
          </View>
        </View>
        {/* Team Section */}
        <View style={styles.meetTheTeamContainer}>
          <Text style={styles.meetTheTeamText}>Meet the Team!</Text>
        </View>
        <View style={styles.carouselContainer}>
          <CarouselSlider itemList={teamMembers} />
        </View>
        {/* Spacer at the bottom */}
        <View style={{ height: 150 }} />
      </Animated.ScrollView>
    </View>
  );
}

// Styles for the InfoScreen component
const styles = StyleSheet.create({
  meetTheTeamContainer: {
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 30,
    marginTop: -70,
    backgroundColor: "#fff",
    width: "100%",
  },
  meetTheTeamText: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    paddingTop: 20,
  },
  bottomContainer: {
    backgroundColor: "#fff",
    zIndex: 0,
  },
  heroContainer: {
    height: 500,
    position: "relative",
    backgroundColor: "#fff",
    zIndex: 0,
  },
  heroImage: {
    width: "100%",
    height: "80%",
    position: "absolute",
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "300%",
    top: -20,
    zIndex: -1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  whiteBlurOverlay: {
    position: "absolute",
    width: "100%",
    height: "300%",
    top: -20,
    zIndex: -1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  heroContent: {
    position: "absolute",
    top: "30%",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  carouselContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 50,
    // alignItems: "center",
    // justifyContent: "center",
  },
  imageContainer: {
    width: width * 0.7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    top: -60,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    top: -60,
  },
  teamText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
    top: -50,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: -20,
    paddingBottom: 75,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  featuresSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureItem: {
    width: "48%", // Each item takes ~half of the container width
    marginBottom: 20, // Add spacing between rows
  },
});