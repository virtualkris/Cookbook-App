import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

// Sample data for recipes (id, name, image, and description)
const recipes = [
  {
    id: "1",
    name: "Pork Adobo",
    image: require("../../assets/images/Adobo.png"),
    description: "A classic Filipino dish with soy sauce and vinegar.",
  },
  {
    id: "2",
    name: "Kampapangan Kare-kare",
    image: require("../../assets/images/Kapampangan Kare-kare.png"),
    description: "A stir-fried noodle dish with vegetables and meat.",
  },
  {
    id: "3",
    name: "Fish Sinigang",
    image: require("../../assets/images/Sinigang.png"),
    description: "A sour tamarind-based soup with pork or shrimp.",
  },
  {
    id: "4",
    name: "Creamy Leche Flan",
    image: require("../../assets/images/Leche Flan.png"),
    description: "A classic Filipino dish with soy sauce and vinegar.",
  },
  {
    id: "5",
    name: "Soft Puto",
    image: require("../../assets/images/Puto.png"),
    description: "A classic Filipino dish with soy sauce and vinegar.",
  },
];

export default function App() {
  // State to store the search input value
  const [search, setSearch] = useState("");

  // Function to filter recipes based on search input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe Book</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        onChangeText={setSearch} // Updates the search state
        value={search} // Binds input value to state
      />

      {/* FlatList to display the list of recipes */}
      <FlatList
        data={filteredRecipes} // Uses the filtered recipe list
        keyExtractor={(item) => item.id} // Unique key for each item
        renderItem={({ item }) => (
          // Each recipe card is touchable
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              console.log(`Clicked: ${item.name}`); // Debugging log
              alert(`${item.name}\n\n${item.description}`); // Alternative alert
            }}
          >
            {/* Full-card image */}
            <Image source={item.image} style={styles.image} />
            {/* Recipe name as an overlay on the image */}
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles for the UI components
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes full screen height
    backgroundColor: "#fafafa", // Light background color
    padding: 20, // Adds padding around the edges
  },
  header: {
    fontSize: 24, // Large text size
    fontWeight: "bold", // Bold font
    textAlign: "center", // Centers the text
    marginBottom: 10, // Adds space below the title
  },
  searchBar: {
    backgroundColor: "#fff", // White background
    padding: 10, // Adds padding inside the input
    borderRadius: 8, // Rounds the edges
    marginBottom: 10, // Adds space below the search bar
  },
  card: {
    borderRadius: 10, // Rounded corners
    overflow: "hidden", // Ensures the image doesn't exceed the card bounds
    marginBottom: 10, // Adds spacing between cards
    width: "100%", // Full width
    aspectRatio: 16 / 6, // Adjust this based on your image dimensions
  },
  image: {
    width: "100%", // Image fills the entire card width
    height: "100%", // Image fills the entire card height
    resizeMode: "cover", // Ensures the image fills the card
  },
  name: {
    position: "absolute", // Positions it over the image
    bottom: 10, // Places it near the bottom
    left: 10, // Aligns to the left
    color: "#fff", // White text color
    fontSize: 18, // Slightly larger text
    fontWeight: "bold", // Makes the text bold
    backgroundColor: "rgba(0,0,0,0.5)", // Adds a semi-transparent black background
    padding: 5, // Adds padding inside the label
    borderRadius: 5, // Rounds the edges slightly
  },
});

