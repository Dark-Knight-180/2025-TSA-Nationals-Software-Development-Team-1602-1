import React, { useRef } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FeatureCard from "@/components/FeatureCard";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";

// List of feature cards to display on the homepage
const features = [
  {
    title: "AI-Powered Recommendations",
    description:
      "Our advanced AI analyzes thousands of data points to recommend the best crops for your specific location.",
    iconName: "bar-chart-2",
  },
  {
    title: "Interactive Map Analysis",
    description:
      "Explore soil conditions, climate patterns, and agricultural potential anywhere in the world with our interactive map.",
    iconName: "map",
  },
  {
    title: "Resource Optimization",
    description:
      "Make the most of your water, fertilizer, and other resources with precision agriculture insights.",
    iconName: "droplet",
  },
  {
    title: "Climate Intelligence",
    description:
      "Stay ahead of changing weather patterns with our climate analysis and predictive tools.",
    iconName: "cloud-rain",
  },
  {
    title: "Crop Planning",
    description:
      "Plan your planting schedule and rotations for maximum yield and sustainability.",
    iconName: "feather",
  },
  {
    title: "Seasonal Forecasting",
    description:
      "Get ahead of seasonal changes with long-term forecasting and trend analysis.",
    iconName: "sun",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // Animated value for parallax scroll effects
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Main scrollable content */}
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: "#f2f2f2" }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Hero section with image, title, and buttons */}
        <View style={styles.heroContainer}>
          <Animated.Image
            source={{
              uri: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80",
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
            <View style={styles.badge}>
              <Icon name="feather" size={16} color="#4CAF50" />
              <Text style={styles.badgeText}>
                AI-Powered Precision Agriculture
              </Text>
            </View>
            <Text style={styles.heroTitle}>
              Grow Smarter with{" "}
              <Text style={{ color: "#4CAF50" }}>NeuroCrop</Text>
            </Text>
            <Text style={styles.heroSubtitle}>
              The future of agriculture at your fingertips. Make data-driven
              decisions about what to plant, where to plant, and how to optimize
              resources.
            </Text>
            <Text style={styles.teamText}>Bridgeland Team #2002-2</Text>
            <View style={styles.buttonContainer}>
              {/* Button to go to AI page */}
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={() => router.replace("/(tabs)/AI")}
              >
                <Text style={styles.buttonPrimaryText}>Explore AI</Text>
              </TouchableOpacity>
              {/* Button to go to info page */}
              <TouchableOpacity
                style={styles.buttonOutline}
                onPress={() => router.replace("/(tabs)/info")}
              >
                <Text style={styles.buttonOutlineText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>
            A Complete Agricultural Intelligence Platform
          </Text>
          <Text style={styles.featuresSubtitle}>
            Everything you need to make informed agricultural decisions based on
            data, not guesswork.
          </Text>
          <View style={styles.featuresGrid}>
            {/* Render each feature card */}
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                iconName={feature.iconName}
              />
            ))}
          </View>
        </View>
        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.ctaCard}>
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaTitle}>
                Ready to transform your agricultural approach?
              </Text>
              <Text style={styles.ctaSubtitle}>
                Be at the forefront of Agriculture Technology by using NeuroCrop
                to optimize crop selection, resource usage, and yield potential.
              </Text>
              <View style={styles.ctaButtons}>
                {/* CTA button to AI */}
                <TouchableOpacity
                  style={styles.buttonPrimary}
                  //onPress={() => setAuthModalOpen(true)}
                >
                  <Text
                    style={styles.buttonPrimaryText}
                    onPress={() => router.replace("/(tabs)/AI")}
                  >
                    Explore AI
                  </Text>
                </TouchableOpacity>
                {/* CTA button to info */}
                <TouchableOpacity
                  style={styles.buttonGreenOutline}
                  //onPress={() => navigation.navigate("Solutions")}
                >
                  <Text
                    style={styles.buttonGreenOutlineText}
                    onPress={() => router.replace("/(tabs)/info")}
                  >
                    Learn More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
              }}
              style={styles.ctaImage}
              resizeMode="cover"
            />
          </View>
        </View>
        {/* Spacer at the bottom */}
        <View style={{ height: 150 }} />
      </Animated.ScrollView>
    </View>
  );
}

// Styles for the homepage UI
const styles = StyleSheet.create({
  heroContainer: {
    height: 500,
    position: "relative",
    backgroundColor: "#f2f2f2",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#f2f2f2",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
  },
  whiteBlurOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
  },
  heroContent: {
    position: "absolute",
    top: "30%",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeText: {
    color: "#4CAF50",
    marginLeft: 5,
    fontSize: 12,
    alignSelf: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  teamText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonOutlineText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  buttonGreenOutline: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonGreenOutlineText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#fff",
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
  ctaSection: {
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  ctaCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  ctaTextContainer: {
    flex: 1,
    padding: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  ctaButtons: {
    flexDirection: "row",
  },
  ctaImage: {
    width: 150,
    height: 150,
  },
});
