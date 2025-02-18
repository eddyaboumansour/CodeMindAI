import React, { useState } from "react"
import { StyleSheet, View, SafeAreaView, Alert } from "react-native"
import InputScreen from "./components/InputScreen"
import QuizScreen from "./components/QuizScreen"
import ResultScreen from "./components/ResultScreen"
import LoadingScreen from "./components/LoadingScreen"
import { generateQuestions, type Question } from "./utils/mistralService"

export default function App() {
  const [subject, setSubject] = useState<string>("")
  const [questionCount, setQuestionCount] = useState<string>("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const startQuiz = async (subject: string, count: string) => {
    setIsLoading(true)
    setSubject(subject)
    setQuestionCount(count)
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizFinished(false)

    try {
      const generatedQuestions = await generateQuestions(subject, Number.parseInt(count))
      if (generatedQuestions.length === 0) {
        throw new Error("No questions generated")
      }
      setQuestions(generatedQuestions)
      setQuizStarted(true)
    } catch (error) {
      console.error("Error generating questions:", error)
      Alert.alert("Error", "Failed to generate questions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const answerQuestion = (selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setQuizFinished(true)
    }
  }

  const restartQuiz = () => {
    setSubject("")
    setQuestionCount("")
    setQuestions([])
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizStarted(false)
    setQuizFinished(false)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading && <LoadingScreen />}
        {!quizStarted && !isLoading && <InputScreen onStart={startQuiz} />}
        {quizStarted && !quizFinished && questions.length > 0 && (
          <QuizScreen
            question={questions[currentQuestionIndex]}
            onAnswer={answerQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        )}
        {quizFinished && <ResultScreen score={score} totalQuestions={questions.length} onRestart={restartQuiz} />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
})