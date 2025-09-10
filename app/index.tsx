import { Link } from "expo-router"
import React, { useState } from "react"
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

// Importar Firebase
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore } from "firebase/firestore"

// Configuración de Firebase para tu proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBCfYGsvzHLmg2plvmIfxAiudQfv2czaIA",
  authDomain: "save-your-name.firebaseapp.com",
  projectId: "save-your-name",
  storageBucket: "save-your-name.firebasestorage.app",
  messagingSenderId: "1007156630440",
  appId: "1:1007156630440:ios:645b84c4b2c754d617839d",
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const { width } = Dimensions.get("window")

export default function App() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [cargando, setCargando] = useState(false)

  // Animaciones
  const fadeAnim = useState(new Animated.Value(0))[0]
  const slideAnim = useState(new Animated.Value(50))[0]
  const scaleAnim = useState(new Animated.Value(0.9))[0]

  React.useEffect(() => {
    // Animación de entrada
    Animated.parallel([
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
  }, [])

  const guardarDatos = async () => {
    // Validar que los campos no estén vacíos
    if (nombre.trim() === "" || apellido.trim() === "") {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }

    setCargando(true)

    // Animación del botón
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    try {
      // Guardar en Firestore
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        fechaCreacion: new Date(),
      })

      console.log("Documento guardado con ID: ", docRef.id)

      // Mostrar mensaje de éxito
      Alert.alert(
        "🎉 ¡Éxito!",
        `¡Datos guardados correctamente!\n\n📝 Nombre: ${nombre}\n📝 Apellido: ${apellido}`,
        [
          {
            text: "Perfecto ✨",
            onPress: () => {
              // Limpiar los campos
              setNombre("")
              setApellido("")
            },
          },
        ]
      )
    } catch (error) {
      console.error("Error al guardar: ", error)
      Alert.alert(
        "❌ Error",
        "No se pudieron guardar los datos. Intenta de nuevo."
      )
    } finally {
      setCargando(false)
    }
  }

  return (
    <View style={styles.container}>
      {/* Formas decorativas del fondo */}
      <View style={[styles.backgroundShape, styles.shape1]} />
      <View style={[styles.backgroundShape, styles.shape2]} />
      <View style={[styles.backgroundShape, styles.shape3]} />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Botón About en la esquina superior */}
          <View style={styles.topBar}>
            <Link
              href="/about"
              asChild
            >
              <TouchableOpacity style={styles.aboutButton}>
                <Text style={styles.aboutButtonText}>ℹ️ About</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <View style={styles.header}>
              <Text style={styles.title}>✨ Guardar Información</Text>
              <Text style={styles.subtitle}>
                Ingresa tu nombre y apellido para guardarlos en Firebase
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>🧑‍💼 Nombre</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tu nombre aquí..."
                  placeholderTextColor="#9ca3af"
                  value={nombre}
                  onChangeText={setNombre}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>👤 Apellido</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Tu apellido aquí..."
                  placeholderTextColor="#9ca3af"
                  value={apellido}
                  onChangeText={setApellido}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                  style={[styles.button, cargando && styles.buttonDisabled]}
                  onPress={guardarDatos}
                  disabled={cargando}
                >
                  <Text style={styles.buttonText}>
                    {cargando ? "⏳ Guardando..." : "🚀 Guardar en Firebase"}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Fondo oscuro elegante
  },
  backgroundShape: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.1,
  },
  shape1: {
    width: 200,
    height: 200,
    backgroundColor: "#3b82f6",
    top: -50,
    right: -50,
  },
  shape2: {
    width: 150,
    height: 150,
    backgroundColor: "#8b5cf6",
    bottom: 100,
    left: -30,
  },
  shape3: {
    width: 120,
    height: 120,
    backgroundColor: "#06b6d4",
    top: "40%",
    right: -20,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  topBar: {
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 40,
  },
  aboutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  aboutButtonText: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 24,
    padding: 32,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e2e8f0",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#f1f5f9",
    minHeight: 50,
  },
  button: {
    backgroundColor: "#445caaff",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
})
