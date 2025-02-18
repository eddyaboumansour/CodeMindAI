"use client"

import React from "react"
import { useState } from "react"
import { View, TextInput, Button, StyleSheet, Text } from "react-native"

interface InputScreenProps {
  onStart: (subject: string, questionCount: string) => void
}

const InputScreen: React.FC<InputScreenProps> = ({ onStart }) => {
  const [subject, setSubject] = useState("")
  const [questionCount, setQuestionCount] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter subject (e.g., Java)"
        placeholderTextColor="#a0a0a0"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of questions"
        placeholderTextColor="#a0a0a0"
        value={questionCount}
        onChangeText={setQuestionCount}
        keyboardType="numeric"
      />
      <Button
        title="Start Quiz"
        onPress={() => onStart(subject, questionCount)}
        disabled={!subject || !questionCount}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#4a4e69",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#ffffff",
    backgroundColor: "#16213e",
  },
})

export default InputScreen