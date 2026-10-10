import { Pressable, Text, StyleSheet } from "react-native";

export default function MoodButton({ emoji, label, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { borderColor: color },
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, { color: color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 140,
    paddingVertical: 16,
    margin: 8,
    borderRadius: 16,
    borderWidth: 3,
    backgroundColor: "#ffffff",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }],
  },
  emoji: {
    fontSize: 40,
  },
  label: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
  },
});