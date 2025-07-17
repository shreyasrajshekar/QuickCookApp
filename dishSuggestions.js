import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

export default function DishSuggestions({ route, navigation }) {
  const suggestions = route.params?.aiSuggestions || "No suggestions yet.";
  const dishList = suggestions.split("\n");

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>AI Suggested Dishes:</Text>
      <ScrollView style={{ padding: 20 }}>
        {dishList.map((dish, index) => (
          <View key={index} style={styles.dishRow}>
            <Text style={styles.dishItem}>{dish}</Text>
            <Button
              title="Recipe"
              onPress={() => navigation.navigate('Recipe', { dishName: dish })}
              color="#6a5acd"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    paddingTop: 45,
    fontSize: 25,
    textAlign: 'center',
  },
  dishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  dishItem: {
    flex: 1,
    fontSize: 18,
    backgroundColor: "#f1e1ff",
    padding: 10,
    borderRadius: 5,
  },
});