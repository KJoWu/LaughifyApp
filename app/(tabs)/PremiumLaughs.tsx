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
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { laughStyles, Persona } from '../../constants/LaughStyles';

const { width } = Dimensions.get('window');

const PremiumLaughs = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Sort laughs from highest to lowest based on score
  const sortedLaughs = [...laughStyles].sort((a, b) => parseInt(b.value) - parseInt(a.value));

  const playSound = async (audioFile: string) => {
    // Play sound logic here (currently a placeholder)
  };

  // Cleanup audio resources
  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const renderRow = ({ item }: { item: Persona }) => {
    const isLocked = parseInt(item.value) > 3000;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isLocked ? styles.lockedCard : styles.achievedCard,
        ]}
        onPress={() => setSelectedPersona(item)}
      >
        <Image
          source={item.image}
          style={[
            styles.cardImage,
            isLocked && styles.lockedImage,
          ]}
        />
        <View style={styles.cardContent}>
          <Text
            style={[
              styles.cardTitle,
              isLocked && styles.lockedText,
            ]}
          >
            {item.name}
          </Text>
          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.cardValue,
                isLocked && styles.lockedText,
              ]}
            >
              <Ionicons name="diamond-outline" size={14} /> LMV: ${item.value}
            </Text>
            <Text
              style={[
                styles.cardValue,
                isLocked && styles.lockedText,
              ]}
            >
              Current Score: {item.currentScore}
            </Text>

            {isLocked ? (
              <Ionicons
                name="lock-closed"
                size={28}
                color="#FF6B6B"
                style={styles.statusIcon}
              />
            ) : (
              <Ionicons
                name="checkmark-circle"
                size={28}
                color="#34D399"
                style={styles.statusIcon}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedPersona) {
    const isLocked = parseInt(selectedPersona.value) > 5000;

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 300 }}
        style={[
          styles.selectedContainer,
          isLocked
            ? styles.lockedDetailContainer
            : styles.achievedDetailContainer,
        ]}
      >
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setSelectedPersona(null)}
        >
          <Ionicons name="close-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <Image
          source={selectedPersona.image}
          style={[
            styles.selectedImage,
            isLocked && styles.lockedImage,
          ]}
        />
        <Text
          style={[
            styles.selectedName,
            isLocked && styles.lockedText,
          ]}
        >
          {selectedPersona.name}
        </Text>
        <Text
          style={[
            styles.selectedValue,
            isLocked && styles.lockedText,
          ]}
        >
          <Ionicons name="diamond" size={16} /> ${selectedPersona.value} - Laugh Market Value
        </Text>
        <Text
          style={[
            styles.selectedDescription,
            isLocked && styles.lockedText,
          ]}
        >
          {selectedPersona.description}
        </Text>
        <TouchableOpacity
          style={[
            styles.playButton,
            isLocked && styles.lockedButton,
          ]}
          onPress={() => playSound(selectedPersona.audio)}
          disabled={isLocked}
        >
          <LinearGradient
            colors={
              isLocked
                ? ['#4A4A4A', '#2D2D2D', '#1A1A1A']
                : ['#FF6B6B', '#4ECDC4', '#45B7D1']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="play" size={18} color={isLocked ? '#666' : '#fff'} />
          <Text
            style={[
              styles.buttonText,
              isLocked && styles.lockedButtonText,
            ]}
          >
            {isLocked ? 'Locked' : 'Play Laugh'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.practiceButton,
            isLocked && styles.lockedButton,
          ]}
          disabled={isLocked}
        >
          <LinearGradient
            colors={['#4A4A4A', '#2D2D2D', '#1A1A1A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="mic" size={18} color={isLocked ? '#666' : '#fff'} />
          <Text
            style={[
              styles.buttonText,
              isLocked && styles.lockedButtonText,
            ]}
          >
            Challenge Score
          </Text>
        </TouchableOpacity>
        {!isLocked && (
          <View style={styles.acquiredContainer}>
            <Ionicons name="checkmark-circle" size={32} color="#34D399" />
            <Text style={styles.acquiredText}>
              Highest Score: {selectedPersona.currentScore}
            </Text>
          </View>
        )}
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 300 }}
      style={styles.container}
    >
      <Text style={styles.header}>Premium Laughs</Text>
      <FlatList
        data={sortedLaughs}
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
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  achievedCard: {
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
    borderColor: 'rgba(52, 211, 153, 0.2)',
  },
  lockedCard: {
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderColor: 'rgba(255, 107, 107, 0.2)',
    opacity: 0.7,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  lockedImage: {
    opacity: 0.5,
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
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardValue: {
    fontSize: 14,
    color: '#34D399',
    fontWeight: '500',
  },
  statusIcon: {
    marginLeft: 8,
  },
  lockedText: {
    color: '#666',
  },
  selectedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  achievedDetailContainer: {
    backgroundColor: 'black',
  },
  lockedDetailContainer: {
    backgroundColor: '#0A0A0A',
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
  lockedButton: {
    opacity: 0.5,
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
  lockedButtonText: {
    color: '#666',
  },
  acquiredContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acquiredText: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: '600',
    marginLeft: 8,
    textAlign: 'center',
    letterSpacing: 0.3,
  }
});

export default PremiumLaughs;
