import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RecipeScreen() {
  const { recipe } = useLocalSearchParams(); // ✅ Get the full recipe object as a string
  const recipeData = JSON.parse(recipe); // ✅ Convert the string back to an object

  console.log("Recipe Data:", recipeData); // ✅ Ensure it's an object

  if (!recipeData) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Recipe not found
      </Text>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={recipeData.detailsImage} style={styles.image} />
      <Text style={styles.title}>{recipeData.name}</Text>
      <Text style={styles.description}>{recipeData.description}</Text>

      {/* ✅ Ingredients List */}
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {Array.isArray(recipeData.ingredients) ? (
        recipeData.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>
            • {ingredient}
          </Text>
        ))
      ) : (
        <Text style={styles.listItem}>No ingredients available.</Text>
      )}

      {/* ✅ Steps List */}
      <Text style={styles.sectionTitle}>Steps:</Text>
      {Array.isArray(recipeData.steps) ? (
        recipeData.steps.map((step, index) => (
          <Text key={index} style={styles.listItem}>
            {index + 1}. {step}
          </Text>
        ))
      ) : (
        <Text style={styles.listItem}>No steps available.</Text>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: { fontSize: 16, textAlign: "center", marginBottom: 15 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  listItem: { fontSize: 16, lineHeight: 24, marginLeft: 10 },
});
