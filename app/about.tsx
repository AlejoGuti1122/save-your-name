import { Link } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  Animated,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { width, height } = Dimensions.get("window")

export default function About() {
  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0]
  const slideAnim = useState(new Animated.Value(100))[0]
  const rotateAnim = useState(new Animated.Value(0))[0]
  const scaleAnim = useState(new Animated.Value(0))[0]

  // Para las partículas flotantes
  const [particles] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      animValue: new Animated.Value(0),
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 6 + 4,
      duration: Math.random() * 3000 + 2000,
    }))
  )

  useEffect(() => {
    StatusBar.setBarStyle("light-content")

    // Animación principal de entrada
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()

    // Rotación continua del ícono principal
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start()

    // Animación de partículas flotantes
    particles.forEach((particle, index) => {
      const animateParticle = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle.animValue, {
              toValue: 1,
              duration: particle.duration,
              useNativeDriver: true,
            }),
            Animated.timing(particle.animValue, {
              toValue: 0,
              duration: particle.duration,
              useNativeDriver: true,
            }),
          ])
        ).start()
      }

      setTimeout(() => animateParticle(), index * 500)
    })
  }, [])

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  const techStack = [
    { name: "React Native", icon: "📱", color: "#61DAFB" },
    { name: "Expo", icon: "⚡", color: "#000020" },
    { name: "Firebase", icon: "🔥", color: "#FFA000" },
    { name: "Firestore", icon: "🗃️", color: "#FF6F00" },
    { name: "TypeScript", icon: "📘", color: "#3178C6" },
    { name: "JavaScript", icon: "🟨", color: "#F7DF1E" },
  ]

  const features = [
    {
      title: "Base de Datos en Tiempo Real",
      desc: "Guardado instantáneo en Firestore",
      icon: "⚡",
    },
    {
      title: "Interfaz Moderna",
      desc: "Diseño dark mode con animaciones",
      icon: "🎨",
    },
    {
      title: "Validación de Datos",
      desc: "Formularios inteligentes y seguros",
      icon: "✅",
    },
    {
      title: "Experiencia Móvil",
      desc: "Optimizado para iOS y Android",
      icon: "📲",
    },
  ]

  return (
    <View style={styles.container}>
      {/* Partículas flotantes de fondo */}
      {particles.map((particle) => (
        <Animated.View
          key={particle.id}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.animValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.1, 0.6, 0.1],
              }),
              transform: [
                {
                  translateY: particle.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                },
                {
                  scale: particle.animValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1, 0.5],
                  }),
                },
              ],
            },
          ]}
        />
      ))}

      {/* Formas decorativas */}
      <View style={[styles.backgroundShape, styles.shape1]} />
      <View style={[styles.backgroundShape, styles.shape2]} />
      <View style={[styles.backgroundShape, styles.shape3]} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header con botón de retorno */}
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Link
            href="/"
            asChild
          >
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>← Volver</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>

        {/* Título principal con animación */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Animated.Text
            style={[
              styles.heroIcon,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
          >
            🚀
          </Animated.Text>
          <Text style={styles.heroTitle}>Save Your Name</Text>
          <Text style={styles.heroSubtitle}>
            Una aplicación moderna de React Native con Firebase
          </Text>
        </Animated.View>

        {/* Descripción del proyecto */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>📋 Sobre el Proyecto</Text>
          <View style={styles.card}>
            <Text style={styles.description}>
              Esta app fue desarrollada como un proyecto de aprendizaje para
              dominar la integración entre{" "}
              <Text style={styles.highlight}>React Native</Text>,{" "}
              <Text style={styles.highlight}>Expo</Text> y{" "}
              <Text style={styles.highlight}>Firebase</Text>.
            </Text>
            <Text style={styles.description}>
              Permite a los usuarios guardar su información personal de forma
              segura en una base de datos en tiempo real, con una interfaz
              moderna y animaciones fluidas.
            </Text>
          </View>
        </Animated.View>

        {/* Características */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>✨ Características</Text>
          {features.map((feature, index) => (
            <Animated.View
              key={index}
              style={[
                styles.featureCard,
                {
                  transform: [
                    {
                      translateX: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [index % 2 === 0 ? -50 : 50, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.desc}</Text>
              </View>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Tech Stack */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>🛠️ Tecnologías Utilizadas</Text>
          <View style={styles.techGrid}>
            {techStack.map((tech, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.techCard,
                  {
                    transform: [
                      {
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.techIcon}>{tech.icon}</Text>
                <Text style={styles.techName}>{tech.name}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.footerText}>
            Desarrollado con ❤️ por Alejandro
          </Text>
          <Text style={styles.footerSubtext}>
            Proyecto de aprendizaje • 2025
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  particle: {
    position: "absolute",
    backgroundColor: "#3b82f6",
    borderRadius: 50,
  },
  backgroundShape: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.03,
  },
  shape1: {
    width: 300,
    height: 300,
    backgroundColor: "#8b5cf6",
    top: -100,
    right: -100,
  },
  shape2: {
    width: 200,
    height: 200,
    backgroundColor: "#06b6d4",
    bottom: 200,
    left: -50,
  },
  shape3: {
    width: 150,
    height: 150,
    backgroundColor: "#f59e0b",
    top: "50%",
    right: -30,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backButtonText: {
    color: "#e2e8f0",
    fontSize: 16,
    fontWeight: "600",
  },
  heroSection: {
    alignItems: "center",
    marginVertical: 40,
  },
  heroIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 26,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  description: {
    fontSize: 16,
    color: "#cbd5e1",
    lineHeight: 24,
    marginBottom: 16,
  },
  highlight: {
    color: "#3b82f6",
    fontWeight: "bold",
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: "#94a3b8",
  },
  techGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  techCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  techIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  techName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e2e8f0",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: 40,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerText: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
  },
})
