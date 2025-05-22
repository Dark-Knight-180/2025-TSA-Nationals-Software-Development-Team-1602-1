import React, { useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DropdownProps {
  onSelect: (option: string) => void;
  colors?: {
    background?: string;
    text?: string;
    border?: string;
    highlight?: string;
  };
}

const AIDropdown: React.FC<DropdownProps> = ({ onSelect, colors = {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [selectedText, setSelectedText] = useState<string>(
    "Select Detection Type"
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    Animated.timing(animation, {
      toValue: isOpen ? 0 : 1,
      duration: isOpen ? 200 : 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const dropdownHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  return (
    <View
      style={[styles.container, { borderColor: colors.border || "#4CAF50" }]}
    >
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          styles.header,
          { backgroundColor: colors.background || "#E8F5E9" },
        ]}
      >
        <Text style={[styles.headerText, { color: colors.text || "#388E3C" }]}>
          {selectedText}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onSelect("General AI Disease Detection");
            setSelectedText("General AI Disease Detection");
            toggleDropdown();
          }}
        >
          <Image
            source={require("@/assets/images/Disease_Plant.jpg")}
            style={styles.icon}
          />
          <Text style={styles.optionText}>General AI Disease Detection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            onSelect("Specialized AI Cassava Health Detection");
            setSelectedText("Specialized AI Cassava Health Detection");
            toggleDropdown();
          }}
        >
          <Image
            source={require("@/assets/images/cassava.jpg")}
            style={styles.icon}
          />
          <Text style={styles.optionText}>
            Specialized AI Cassava Health Detection
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    padding: 10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    overflow: "hidden",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#388E3C",
  },
  icon: {
    width: 50,
    height: 50,
  },
});

export default AIDropdown;
