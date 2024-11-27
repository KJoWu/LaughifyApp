import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { laughStyles, Persona } from '@/constants/LaughStyles';

const { width } = Dimensions.get('window');

const PremiumLaughs = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const renderRow = ({ item }: { item: Persona }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setSelectedPersona(item)}
    >
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardValue}>
          <Ionicons name="diamond-outline" size={14} /> ${item.value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (selectedPersona) {
    // Render Selected Card
    return (
      <View style={styles.selectedContainer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setSelectedPersona(null)}
        >
          <Ionicons name="close-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <Image source={selectedPersona.image} style={styles.selectedImage} />
        <Text style={styles.selectedName}>{selectedPersona.name}</Text>
        <Text style={styles.selectedValue}>
          <Ionicons name="diamond" size={16} /> ${selectedPersona.value}
        </Text>
        <Text style={styles.selectedDescription}>{selectedPersona.description}</Text>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => console.log('Play Laugh:', selectedPersona.audio)}
        >
          <Ionicons name="play" size={20} color="#fff" />
          <Text style={styles.buttonText}>Play Laugh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => console.log('Practice Laugh:', selectedPersona.audio)}
        >
          <Ionicons name="mic" size={20} color="#fff" />
          <Text style={styles.buttonText}>Practice Laugh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render Row View
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Laugh Styles</Text>
      <FlatList
        data={laughStyles}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#141414',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 14,
    color: '#34D399',
    fontWeight: '500',
  },
  selectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 24,
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  selectedImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: 16,
  },
  selectedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  selectedValue: {
    fontSize: 18,
    color: '#34D399',
    fontWeight: '600',
    marginBottom: 16,
  },
  selectedDescription: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  playButton: {
    backgroundColor: '#34D399',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginBottom: 12,
  },
  practiceButton: {
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PremiumLaughs;
