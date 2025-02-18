import React from "react"
import { View, ActivityIndicator, Text, StyleSheet } from "react-native"

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff" />
      <Text style={styles.text}>Generating questions...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    marginTop: 10,
  },
})

export default LoadingScreen
