import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Fireworks from "./animations/Fireworks"
import RainCloud from "./animations/RaindCloud"

interface ResultScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100)
  const isHighScore = percentage >= 50
  const isLowScore = percentage < 40

  return (
    <View style={styles.container}>
      {isHighScore && <Fireworks />}
      {isLowScore && <RainCloud />}

      <Text style={styles.result}>
        Your Score: {score} / {totalQuestions}
      </Text>
      <Text
        style={[styles.percentage, isHighScore ? styles.highScore : isLowScore ? styles.lowScore : styles.mediumScore]}
      >
        {percentage}%
      </Text>

      <Text style={styles.message}>
        {isHighScore ? "Great job! 🎉" : isLowScore ? "Keep practicing! 💪" : "Good effort! 👍"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRestart}>
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 300,
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ffffff",
    zIndex: 1,
  },
  percentage: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    zIndex: 1,
  },
  highScore: {
    color: "#4CAF50", // Green
  },
  mediumScore: {
    color: "#FFC107", // Amber
  },
  lowScore: {
    color: "#F44336", // Red
  },
  message: {
    fontSize: 20,
    marginBottom: 30,
    color: "#ffffff",
    zIndex: 1,
  },
  button: {
    backgroundColor: "#e94560",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    zIndex: 1,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default ResultScreen