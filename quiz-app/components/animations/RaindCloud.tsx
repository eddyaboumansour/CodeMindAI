"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"

const RainCloud: React.FC = () => {
  const [cloudPosition] = useState(new Animated.Value(-100))
  const [raindrops] = useState(
    Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 200 + 50,
      y: new Animated.Value(0),
      delay: Math.random() * 2000,
      duration: Math.random() * 1000 + 1000,
    })),
  )

  useEffect(() => {
    // Animate cloud
    Animated.timing(cloudPosition, {
      toValue: 150,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start()

    // Animate raindrops
    raindrops.forEach((raindrop) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(raindrop.delay),
          Animated.timing(raindrop.y, {
            toValue: 400,
            duration: raindrop.duration,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(raindrop.y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    })
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.cloud,
          {
            transform: [{ translateX: cloudPosition }],
          },
        ]}
      >
        <View style={styles.cloudCircle1} />
        <View style={styles.cloudCircle2} />
        <View style={styles.cloudCircle3} />
        <View style={styles.cloudBase} />
      </Animated.View>

      {raindrops.map((raindrop, index) => (
        <Animated.View
          key={index}
          style={[
            styles.raindrop,
            {
              left: raindrop.x,
              transform: [{ translateY: raindrop.y }],
            },
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  cloud: {
    position: "absolute",
    top: 50,
  },
  cloudCircle1: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CCCCCC",
    left: 10,
    top: 10,
  },
  cloudCircle2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#CCCCCC",
    left: 40,
    top: 5,
  },
  cloudCircle3: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#CCCCCC",
    left: 70,
    top: 10,
  },
  cloudBase: {
    position: "absolute",
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#CCCCCC",
    left: 15,
    top: 30,
  },
  raindrop: {
    position: "absolute",
    width: 3,
    height: 15,
    backgroundColor: "#4287f5",
    borderRadius: 5,
    top: 100,
  },
})

export default RainCloud