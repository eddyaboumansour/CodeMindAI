"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { View, StyleSheet, Animated, Easing } from "react-native"

interface FireworkProps {
  x: number
  delay: number
  color: string
}

const Firework: React.FC<FireworkProps> = ({ x, delay, color }) => {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start()
  }, [])

  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const translateX = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.cos(angle) * 100],
    })
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Math.sin(angle) * 100],
    })
    const opacity = animation.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    })
    const scale = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.5, 1, 0.5],
    })

    return (
      <Animated.View
        key={i}
        style={[
          styles.particle,
          {
            backgroundColor: color,
            transform: [{ translateX }, { translateY }, { scale }],
            opacity,
          },
        ]}
      />
    )
  })

  return <View style={[styles.firework, { left: x }]}>{particles}</View>
}

const Fireworks: React.FC = () => {
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"]

  return (
    <View style={styles.container}>
      {Array.from({ length: 10 }).map((_, i) => (
        <Firework
          key={i}
          x={Math.random() * 300}
          delay={i * 500}
          color={colors[Math.floor(Math.random() * colors.length)]}
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
  firework: {
    position: "absolute",
    top: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  particle: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})

export default Fireworks