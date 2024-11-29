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
import { LinearGradient } from 'expo-linear-gradient';

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
      <MotiView 
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        style={styles.selectedContainer}
      >
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
        <TouchableOpacity style={styles.playButton}>
          <LinearGradient
            colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="play" size={18} color="#fff" />
          <Text style={styles.buttonText}>Play Laugh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.practiceButton}>
          <LinearGradient
            colors={['#4A4A4A', '#2D2D2D', '#1A1A1A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="mic" size={18} color="#fff" />
          <Text style={styles.buttonText}>Practice Laugh (Coming soon!)</Text>
        </TouchableOpacity>
      </MotiView>
    );
  }

  // Render Row View
  return (
    <MotiView 
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <Text style={styles.header}>Premium Laughs</Text>
      <FlatList
        data={laughStyles}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 0.3,
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
    backgroundColor: '#0A0A0A',
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
    borderRadius: width * 0.1,
    marginBottom: 16,
  },
  selectedName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  selectedValue: {
    fontSize: 18,
    color: '#34D399',
    fontWeight: '600',
    marginBottom: 16,
  },
  selectedDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  playButton: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
    marginBottom: 12,
  },
  practiceButton: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
});

export default PremiumLaughs;
