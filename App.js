import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DishSuggestions from './dishSuggestions';
import { getDishSuggestions } from './utils/fetchGeminiSuggestions';
import RecipeScreen from './RecipeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{
            title: 'QuickCook',
            headerStyle: { backgroundColor: '#ffdb9c' },
            headerTintColor: '#000',
            headerTitleStyle: { fontSize: 24 },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Suggestions"
          component={DishSuggestions}
          options={{
            title: 'Dishes',
            headerStyle: { backgroundColor: '#f78c68' },
            headerTintColor: '#000',
            headerTitleStyle: { fontSize: 24 },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          component={RecipeScreen}
          name="Recipe"
          options={{
            title: 'Recipe',
            headerStyle: { backgroundColor: '#ffe8d1' },
            headerTintColor: '#000',
            headerTitleStyle: { fontSize: 24 },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainScreen({ navigation }) {
  const [enteredGrocery, setEnteredGrocery] = useState('');
  const [courseGrocery, setCourseGrocery] = useState([]);
  const [enteredDish, setEnteredDish] = useState('');
  const [courseDish, setCourseDish] = useState([]);
  const GEMINI_API_KEY = 'AIzaSyD3WzjHHxqT5j9kgJ1B2ZU0NbJ6ib-BC5o';

  async function handleSuggestDishes() {
    const groceryNames = courseGrocery.map((item) => item.name);
    const result = await getDishSuggestions(groceryNames, GEMINI_API_KEY);
    navigation.navigate('Suggestions', { aiSuggestions: result });
  }

  return (
    <View style={styles.container}>
      <View style={styles.InputContainer}>
        <TextInput
          placeholder="Your Groceries"
          style={styles.textBox}
          onChangeText={setEnteredGrocery}
          value={enteredGrocery}
        />
        <Button title="Enter" color="#fa8546" onPress={() => {
          if (enteredGrocery.trim()) {
            setCourseGrocery(prev => [...prev, { id: Math.random().toString(), name: enteredGrocery }]);
            setEnteredGrocery('');
          }
        }} />
      </View>

      <ScrollView>
        {courseGrocery.map((item) => (
          <View key={item.id} style={styles.groceryItemContainer}>
            <Text style={styles.groceryItem}>{item.name}</Text>
            <Button title="Remove" color="#e03838" onPress={() => {
              setCourseGrocery(prev => prev.filter(i => i.id !== item.id));
            }} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.dishPageContainer}>
        <TouchableOpacity style={styles.dishButton} onPress={handleSuggestDishes}>
          <Text>Suggest Dishes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText:{
    paddingTop:45,
    fontSize:25,
  },
  dishPageContainer:{
     flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  dishButton:{
    height:50,
    width:160,
    backgroundColor:"#fa695f",
    borderRadius:7,
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
     margin:50
  },
   dishHeaderText:{
    paddingTop:7,
    fontSize:25,
    color:"#000"
  },
  rmvBtn:{
    margin:20,
    color:"#000"
  },
  header:{
    backgroundColor: '#ffdb9c',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height:100,
  },
   dishHeader:{
    backgroundColor: '#f78c68',
    alignItems: 'center',
    height:50, 
    borderTopWidth:2,
    borderColor:'#aaa'
  },
  InputContainer:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    borderBottomWidth:2,
    padding:20,
    borderColor:"#aaa"
  },
  textBox:{
    borderWidth: 2,
    borderRadius:7,
    borderColor:"#000",
    height:45,
    width:300,
    margin:10,
    fontSize:17
  },
  groceryItem:{
    
    borderWidth:2,
    borderRadius:5,
    backgroundColor:"#9ec0f7",
    borderColor:"#2071f5",
    justifyContent:'center',
    paddingLeft:20,
    height:40,
    fontSize:23,
    flexDirection:'row',
    width:300
  },
  dishItem:{
    
    borderWidth:2,
    borderRadius:5,
    backgroundColor:"#d694f7",
    borderColor:"#ac1ff2",
    justifyContent:'center',
    paddingLeft:20,
    height:40,
    fontSize:23,
    flexDirection:'row',
    width:300
  },
  groceryItemContainer:{
    display:'flex',
    flexDirection:'row',
    height:40,
    justifyContent:'center',
    alignContent:'center',
    margin:10,
    gap:10
  },
});
