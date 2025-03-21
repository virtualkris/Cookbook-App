import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router"; // Import router for navigation
import { Ionicons } from "@expo/vector-icons"; // ✅ Import search icon

// Sample recipe data
const recipes = [
  {
    id: "1",
    name: "Pork Adobo",
    image: require("../../assets/images/Adobo.png"),
    detailsImage: require("../../assets/images/Adobo1.png"),
    description: "A classic Filipino dish with soy sauce and vinegar.",
    ingredients: [
      "0.5 kg pork liempo",
      "1 sachet MAGGI Oyster Sauce",
      "1 head garlic",
      "3 tbsp white vinegar",
      "1 cup water",
      "1 tsp black peppercorn",
      "2 pcs bay leaf",
      "1 tbsp vegetable oil",
      "1 sachet MAGGI Magic Sarap",
    ],
    steps: [
      "50 MINUTES. Combine pork, MAGGI Oyster Sauce, garlic, vinegar, water, peppercorn and bay leaf in a pot. Cover and simmer for 45mins. Strain pork and set aside.",
      "10 MINUTES. Sauté pork and garlic in oil until light golden brown. Pour cooking liquid and season with MAGGI Magic Sarap®. Simmer until sauce is thick and coating the pork.",
      "1 MINUTE. Transfer on a serving plate and serve.",
    ],
  },
  {
    id: "2",
    name: "Kare-kareng Bagnet",
    image: require("../../assets/images/Kare-kare.png"),
    detailsImage: require("../../assets/images/Karekare2.png"),
    description: "A peanut-based stew with oxtail and vegetables.",
    ingredients: [
      "0.5 kg pork belly",
      "2 sachets Maggi Magic Sarap 8g",
      "0.25 tsp ground pepper",
      "1 cup vegetable oil",
      "2 pcs eggplant",
      "4 cloves garlic",
      "2 tbsp ground rice",
      "2 tbsp ground peanut",
      "1 tsp annatto with lye",
      "2 cups water",
      "1 bunch sitaw",
      "1 bunch pechay",
      "0.5 cup bagoong alamang",
    ],
    steps: [
      "10 MINUTES. Season pork with 1 sachet of MAGGI Magic Sarap and pepper. Fry in preheated oil until golden brown. Transfer on a cooling rack to drain exccess oil.",
      "5 MINUTES. Fry eggplant in the same oil until golden brown. Transfer on a cooling rack to drain excess oil.",
      "15 MINUTES. Remove oul from the pan leaving 2 tbsp. Saute garlic and onion in oil in a pot. Add ground rice. Stir in water and brin to simmer. Slowly add annatto water until desired color is achieved. Stir in the ground peanut. Season with remaining sachet of MAGGI Magic Sarap.",
      "5 MINUTES. Pour sauce into a serving bowl. Cut Bagnet and place on top. Add fried eggplant, blanched pechay and sitaw. Serve with Bagoong.",
    ],
  },
  {
    id: "3",
    name: "Sinigang na Bangus",
    image: require("../../assets/images/Sinigang.png"),
    detailsImage: require("../../assets/images/Sinigang3.png"),
    description: "A sour tamarind-based soup with fish.",
    ingredients: [
      "4.5 cups water",
      "1 pc onion",
      "2 pcs tomato",
      "1 pc green finger chili",
      "0.5 kg bangus",
      "0.5 cup radish",
      "0.5 cup okra",
      "0.5 cup sitaw",
      "1 sachet MAGGI Magic Sinigang sa Sampaloc with Gabi Mix",
      "1 bunch kangkong",
    ],
    steps: [
      "10 MINUTES. Simmer water with onion, tomato and siling panigang for 10 minutes.",
      "3 MINUTES. Add bangus and simmer for 3 minutes.",
      "10 MINUTES. Add radish, okra, and sitaw with 2-minute intervals.",
      "2 MINUTES. Pour MAGGI Magic Sinigang with Gabi. Stir in kangkong. Transfer into a serving bowl and serve immediately.",
    ],
  },
  {
    id: "4",
    name: "Creamy Leche Flan",
    image: require("../../assets/images/Leche Flan.png"),
    detailsImage: require("../../assets/images/Flan4.png"),
    description: "A creamy caramel custard dessert.",
    ingredients: [
      "10 pieces eggs",
      "1 can condensed milk (14 oz)",
      "1 cup fresh milk or evaporated milk",
      "1 cup granulated sugar",
      "1 tsp vanilla extract",
    ],
    steps: [
      "Using all the eggs, separate the yolk from the egg white (only egg yolks will be used).",
      "Place the egg yolks in a big bowl the beat them using a fork or an egg beater.",
      "Add the condensed milk and mix thoroughly.",
      "Pour in the fresh milk and vanilla extract. Mix well.",
      "Put the mold (llanera) on top of the stove and heat using low fire.",
      "Put in the granulated sugar on the mold and mix thoroughly until the solid sugar turns into liquid (caramel) having a ligh brown color. Note: Sometimes it is hard to find a llanera depending on your location. You may use round pans instead.",
      "Spread the caramel evenly on the flat side of the mold.",
      "Wait for 5 minutes the pour the egg yolk and milkl mixture on the mold.",
      "Cover the top of the mold using aluminum foil.",
      "Steam the mold with egg and milk mixture for 30-35 minutes.",
      "After steaming, let the temperature cool down then refrigerate.",
      "Serve for dessert.",
    ],
  },
  {
    id: "5",
    name: "Soft Puto",
    image: require("../../assets/images/Puto.png"),
    detailsImage: require("../../assets/images/Puto5.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "1 cup all-purpose flour",
      "1/2 cup granulated white sugar",
      "1 1/2 tsp baking powder",
      "3/4 cup fresh milk",
      "1/4 tsp vanilla extract",
      "3/4 cup sharp cheddar cheese",
      "1 egg",
      "2 tbsp butter",
      "5 cups water",
    ],
    steps: [
      "Pour water into a steamer or cooking pot. Let it boil.",
      "Sift flour, sugar, and baking powder. Combine in a bowl. Mix well.",
      "Gradually add the milk and egg while stirring. Continue to stir until the texture of the mixture becomes smooth.",
      "Stir in the vanill extract, butter, and half of the cheese.",
      "Pour the mixture into small to medium-sized molds. Arrange in a steamer. Cover and steam for 25 minutes. Top each puto with the remaining cheese. Steam for another 5 minutes.",
      "Take the steamed cheese puto out of the steamer. Let it cool down.",
      "Gently remove the puto from the mold with the help of a spatula.",
      "Arrange in serving plate. Serve.",
    ],
  },
  {
    id: "6",
    name: "Chiken Inasal",
    image: require("../../assets/images/Chicken Inasal.png"),
    detailsImage: require("../../assets/images/Inasal6.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "0.5 kg chicken thigh",
      "0.5 sachet MAGGI Magic Sarap",
      "3 tbsp MAGGI Savor Chilimansi",
      "2 tbsp white vinegar",
      "2 stalks lemongrass",
      "1 tbsp ginger root",
      "4 cloves garlic",
      "0.5 tsp ground pepper",
      "1 tbsp annatto seeds",
      "3 tbsp vegetable oil",
      "0.5 cup spiced vinegar",
    ],
    steps: [
      "5 MINUTES. Marinate chicken with MAGGI Magic Sarap, MAGGI Savor Chilimansi, vinegar, lemongrass, ginger, garlic, and pepper. Set aside.",
      "4 MINUTES. Combine annatto seeds and oil in a pan. Gently heat for 3 minutes and strain.",
      "15 MINUTES. Skewer chicken pieces and brush with annatto oil. Preheat a clean grill and cook for 2-3 minutes per side.",
      "1 MINUTE. Transfer plate and serve with spiced vinegar.",
    ],
  },
  {
    id: "7",
    name: "Halo-halo",
    image: require("../../assets/images/Halo-halo.png"),
    detailsImage: require("../../assets/images/Halohalo7.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "1/4 cup small tapioca pearls (optional)",
      "3 saba bananas, or 2 regular bananas",
      "1 cup water, plus more for the pearls",
      "3/4 cup packed light brown sugar",
      "1/4 tsp salt",
      "1/4 tsp vanilla extract",
      "1 can jackfruit in syrup",
      "2/3 cup canned full-fat unsweetened coconut milk.",
      "3 tbsp evaporated milk",
      "3 tbsp sweetened condensed milk",
      "minatamis na saging and tapioca",
      "4 scoops coconut or ube ice cream",
      "1/2 cup macapuno",
      "1/2 cup ube halaya",
      "1 1/2 cups nata de coco",
      "4 cups shaved ice, plus more",
    ],
    steps: [
      "Cook the tapioca (optional). Bring a medium saucepan of water to a boil over medium-high heat. Add 1/4 cup small tapioca pearls, stir to combine, and reduce the heat to maintain a simmer. Simmer until the tapioca is al dente (translucent with small white centers), about 7 to 8 minutes. Drain through a fine-mesh strainer.",
      "Slice the bananas. Peel and slice 3 saba or 2 regular bananas crosswise into 1/4-inch-thick rounds.",
      "Make the syrup. Place 1 cup water, 3/4 cup packed light brown sugar, and 1/4 teaspoon kosher salt in a large saucepan. Stir and bring to a boil over medium-high heat. Reduce the heat to maintain a simmer and cook for 5 minutes.",
      "Add the bananas. Add the bananas and bring to a boil. Reduce the heat to maintain a low simmer and cook until tender and translucent, about 5 minutes.",
      "Add the tapioca. Add 1/4 teaspoon vanilla extract and tapioca if using, and stir to combine, breaking up any clumps. Transfer to a medium bowl and let cool to room temperature. Cover and refrigerate until cold, about 2 hours.",
      "Cut the jackfruit. Remove the jackfruit from a 20-ounce can, leaving the syrup behind. Coarsely chop the jackfruit into bite-sized pieces. Return the jackfruit back to the can.",
      "Make the milk mixture. Place 2/3 cup coconut milk, 3 tablespoons evaporated milk, and 3 tablespoons sweetened condensed milk in a small bowl or liquid measuring cup and stir to combine.",
      "Assemble the halo-halo. For each serving, layer the ingredients in a 16-ounce glass in the following order: 1/3 cup minatamis na saging, 1 scoop coconut or ube ice cream, 2 tablespoons macapuno, 2 tablespoons ube halaya, 1/4 cup jackfruit and syrup, and 1/3 cup coco de nata. Top with 1 cup shaved ice and drizzle with 3 tablespoons of the milk mixture. Add more shaved ice to fill the glass if needed.",
      "Serve and enjoy. Serve with a long spoon and mix it all up before eating.",
    ],
  },
  {
    id: "8",
    name: "Bilo-bilo",
    image: require("../../assets/images/Bilo-bilo.png"),
    detailsImage: require("../../assets/images/Bilobilo8.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "2 cups glutinous rice flour",
      "3-4 cup water",
      "2 400ml can coconut milk or cream",
      "1 1/2 cup cooked tapioca pearls",
      "3/4 cup sugar",
      "2 big sweet potatoes - peeled and cubed",
      "4 piece plantain bananas - peeled and cubed",
      "1 cup jackfruit - cut into strips",
    ],
    steps: [
      "Prepare the sticky rice balls by adding 1 cup of water to 2 cups glutinous rice flour. Mix with a fork until it forms a dough. Scoop about half a spoon of the dough and form them into balls using your palms. Set them aside.",
      "In a pot, combine 2 cups water, coconut milk, and sugar and bring to boil. Add the sweet potato cubes and cook for about 3 minutes stirring occasionally. Next, add the plantain banana cubes and cook for about 3 minutes.",
      "Once the sweet potatoes and bananas are almost cooked, add the sticky rice balls and let simmer until they are cooked (about 5 minutes) while stirring occasionally. You know the sticky balls are done when they are floating.",
      "Add the jackfruit slices and the cooked tapioca pearls. Let simmer for another 3-5 minutes or until all fruits are tender and cooked.",
      "Note that it will continue to thicken even after removing it from the heat. Serve hot or cold.",
    ],
  },
  {
    id: "9",
    name: "Pinakbet",
    image: require("../../assets/images/Pinakbet.png"),
    detailsImage: require("../../assets/images/Pakbet9.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "0.5 kg bangus",
      "0.5 sachet MAGGI Magic Sarap",
      "0.25 cup vegetable oil",
      "6 cloves toasted garlic",
      "1 pc red onion",
      "3 pcs tomatoes, red, ripe, cooked",
      "1 pc green finger chili",
      "2 tbsp bagoong isda",
      "3 cups water",
      "1 cup kalabasa",
      "0.5 cup okra",
      "0.5 cup ampalaya",
      "0.5 cup sigarilyas",
      "0.5 cup eggplant",
    ],
    steps: [
      "10 MINUTES. Season bangus with MAGGI Magic Sarap and fry until golden brown. Set aside.",
      "10 MINUTES. Combine garlic, onion, tomato, finger chili, bagoong isda and water in a pot, cover and simmer for 10mins.",
      "10 MINUTES. Add kalabasa, okra and sigarilyas in 2-min intervals. Add ampalaya, eggplant and fried bangus and simmer for 5mins.",
      "5 MINUTES. Season with MAGGI Magic Sarap and simmer for another minute. Transfer on a serving plate and serve.",
    ],
  },
  {
    id: "10",
    name: "Filipino Style Spaghetti",
    image: require("../../assets/images/Spaghetti.png"),
    detailsImage: require("../../assets/images/Spaghetti10.png"),
    description: "A soft steamed rice cake.",
    ingredients: [
      "2 tbsp vegetable oil",
      "4 cloves garlic",
      "1 pc onion",
      "1 packet MAGGI Ginisahog",
      "0.5 cup tomato sauce",
      "0.5 cup banana catsup",
      "1 cup water",
      "0.25 cup brown sugar",
      "0.25 kg spaghetti",
      "4 tbsp grated cheese",
    ],
    steps: [
      "2 MINUTES. Sauté garlic, onion and MAGGI Ginisahog in oil.",
      "10 MINUTES. Add tomato sauce, catsup, water and brown sugar. Simmer for 10mins.",
      "10 MINUTES. Boil pasta according to package direction.",
      "3 MINUTES. Strain spaghetti and transfer on a large plate. Pour spaghetti sauce, top with cheese and serve.",
    ],
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState(""); // State to manage search input
  const router = useRouter(); // Initialize router for navigation

  const handleSearch = () => {
    console.log("Searching for:", search);
  };

  // Function to filter recipes based on user input
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* ✅ Logo & Title Section */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Recipe Book</Text>
      </View>

      {/* ✅ Search Bar with Icon */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search recipes..."
          onChangeText={setSearch}
          value={search}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* FlatList to display recipes dynamically */}
      <FlatList
        data={filteredRecipes} // Uses filtered recipes
        keyExtractor={(item) => item.id} // Unique identifier for each item
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/recipescreen",
                params: { recipe: JSON.stringify(item) },
              })
            }
          >
            {/* Recipe Image */}
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fafafa", 
    padding: 20 
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  logo: { 
    width: 50, 
    height: 50, 
    resizeMode: "contain" 
  }, // ✅ Adjust logo size

  appTitle: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "right", 
    flex: 1 }, // ✅ Move title to the right

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  searchBar: { 
    flex: 1, 
    padding: 10 },

  searchIcon: { padding: 10 },

  card: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    width: "100%",
    aspectRatio: 16 / 6,
  },
  image: { 
    width: "100%", 
    height: "100%", 
    resizeMode: "cover" 
  },
  
  name: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 5,
  },
});
