"use client"

import React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import type { Question } from "../utils/mistralService"

interface QuizScreenProps {
  question: Question
  onAnswer: (answer: string) => void
  currentQuestion: number
  totalQuestions: number
}

const QuizScreen: React.FC<QuizScreenProps> = ({ question, onAnswer, currentQuestion, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === question.correctAnswer
    setIsCorrect(correct)
    setShowFeedback(true)
    setTimeout(() => {
      setShowFeedback(false)
      setSelectedAnswer(null)
      onAnswer(answer)
    }, 1000) // Show feedback for 1 second before moving to the next question
  }

  const getButtonStyle = (answer: string) => {
    if (!showFeedback) {
      return styles.answerButton
    }
    if (selectedAnswer === answer) {
      return selectedAnswer === question.correctAnswer ? styles.correctAnswer : styles.incorrectAnswer
    }
    return answer === question.correctAnswer ? styles.correctAnswer : styles.answerButton
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentQuestion} of {totalQuestions}
      </Text>
      <Text style={styles.question}>{question.question}</Text>

      {/* Feedback text positioned above answer boxes */}
      {showFeedback && (
        <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
          {isCorrect ? "Correct!" : "Incorrect!"}
        </Text>
      )}
      
      {question.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(answer.charAt(0))}
          onPress={() => handleAnswer(answer.charAt(0))}
          disabled={showFeedback}
        >
          <Text style={styles.answerText}>{answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  progress: {
    fontSize: 16,
    marginBottom: 10,
    color: "#ffffff",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    height: 25, // Fixed height to prevent layout shift
  },
  correctText: {
    color: "#4CAF50", // Green color for correct
  },
  incorrectText: {
    color: "#F44336", // Red color for incorrect
  },
  answerButton: {
    backgroundColor: "#0f3460",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  correctAnswer: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  incorrectAnswer: {
    backgroundColor: "#F44336",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  answerText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "left",
    width: "100%",
  },
})

export default QuizScreen