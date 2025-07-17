import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getDishRecipe } from './utils/fetchGeminiRecipe';

export default function RecipeScreen({ route }) {
  const { dishName } = route.params;
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const result = await getDishRecipe(dishName);
        setRecipe(result);
      } catch (error) {
        setRecipe("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [dishName]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dishName}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f78c68" />
      ) : (
        <ScrollView style={styles.recipeBox}>
          <Text style={styles.recipeText}>{recipe}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeBox: {
    backgroundColor: '#fff7ec',
    borderRadius: 10,
    padding: 15,
    maxHeight: '80%',
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
  },
});
