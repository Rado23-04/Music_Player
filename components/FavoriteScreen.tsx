import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Définir une interface pour les props
interface FavoritesScreenProps {
  favorites: string[]; // `favorites` est un tableau de chaînes de caractères
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ favorites }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#bb86fc',
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default FavoritesScreen;