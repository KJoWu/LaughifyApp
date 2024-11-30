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
import tw from 'tailwind-react-native-classnames';

const { width } = Dimensions.get('window');

const PremiumLaughs = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const sortedLaughs = [...laughStyles].sort((a, b) => parseInt(a.value) - parseInt(b.value));

  const playSound = async (audioFile: string) => {
    // Placeholder for sound logic
  };

  React.useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const renderRow = ({ item }: { item: Persona }) => {
    const value = parseInt(item.value);
    const isLocked = value > 3000;
    const isAchieved = !isLocked && item.currentScore > 5;

    const cardStyle = tw`flex-row p-4 rounded-2xl mb-5 items-center border-2 shadow-lg`;
    const bgStyle = isLocked
      ? { backgroundColor: '#252525', borderColor: '#FF4C4C' }
      : isAchieved
        ? { backgroundColor: '#1F1F1F', borderColor: '#4ECDC4' }
        : { backgroundColor: '#1F1F1F', borderColor: '#45B8B0' };

    return (
      <TouchableOpacity
        style={[cardStyle, bgStyle]}
        onPress={() => !isLocked && setSelectedPersona(item)}
      >
        <Image
          source={item.image}
          style={[
            tw`w-16 h-16 rounded-xl mr-4`,
            isLocked && { opacity: 0.6 },
          ]}
        />
        <View style={tw`flex-1`}>
          <Text style={tw`text-base font-semibold mb-2 tracking-wide`}>
            <Ionicons
              name="diamond-outline"
              size={14}
              color={isLocked ? "#FF6B6B" : "#4ECDC4"}
            />
            <Text style={{ color: isLocked ? "#ff6b6b" : "#4ECDC4" }}>
              LMV: {item.value}
            </Text>
            <Text style={tw`text-gray-300`}> | </Text>
            <Text style={isLocked ? tw`text-gray-500` : tw`text-gray-300`}>
              {item.name}
            </Text>
          </Text>
          <View style={tw`flex-row items-center justify-between`}>
            {!isLocked ? (
              <Text style={{ color: "#4ECDC4", fontWeight: "600" }}>
                Current Score: {item.currentScore}
              </Text>
            ) : (
              <Text style={tw`text-red-400 text-sm`}>Unlock with higher LMV</Text>
            )}

            {isLocked ? (
              <Ionicons
                name="lock-closed"
                size={28}
                color="#FF6B6B"
                style={tw`ml-2`}
              />
            ) : isAchieved ? (
              <Ionicons
                name="checkmark-circle"
                size={28}
                color="#34D399"
                style={tw`ml-2`}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (selectedPersona) {
    const isLocked = parseInt(selectedPersona.value) > 3000;

    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 300 }}
        style={tw`flex-1 justify-center items-center p-6 bg-black`}
      >
        <TouchableOpacity
          style={tw`absolute top-5 right-5`}
          onPress={() => setSelectedPersona(null)}
        >
          <Ionicons name="close-circle" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={tw`relative`}>
          <Image
            source={selectedPersona.image}
            style={[
              tw`w-40 h-40 rounded-3xl mb-4`,
              isLocked && { opacity: 0.6 },
            ]}
          />
          {isLocked && (
            <View
              style={tw`absolute right-2 top-2 bg-black bg-opacity-70 p-2 rounded-full`}
            >
              <Ionicons name="lock-closed" size={24} color="#FF6B6B" />
            </View>
          )}
        </View>
        <Text style={tw`text-2xl font-bold text-white mb-2 tracking-wide`}>
          {selectedPersona.name}
        </Text>
        <Text style={tw`text-lg font-semibold mb-4`}>
          <Ionicons
            name="diamond"
            size={16}
            color={isLocked ? "#FF6B6B" : "#4ECDC4"}
          />{" "}
          <Text style={{ color: isLocked ? "red" : "#4ECDC4" }}>
            ${selectedPersona.value} - Laugh Market Value
          </Text>
        </Text>
        <Text style={tw`text-sm text-gray-400 text-center mb-6 leading-5`}>
          {selectedPersona.description}
        </Text>

        <TouchableOpacity
          style={tw`w-full overflow-hidden flex-row items-center justify-center py-3.5 px-8 rounded-full mb-3`}
          onPress={() => playSound(selectedPersona.audio)}
          disabled={isLocked}
        >
          <LinearGradient
            colors={isLocked ? ["#FF6B6B", "#FF5252"] : ["#4ECDC4", "#00798f"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="play" size={18} color="#fff" />
          <Text style={tw`text-white font-semibold ml-2`}>
            {isLocked ? "Locked" : "Play Laugh"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`w-full overflow-hidden flex-row items-center justify-center py-3.5 px-8 rounded-full mb-3`}
          onPress={() => playSound(selectedPersona.audio)}
          disabled={isLocked}
        >
          <LinearGradient
            colors={isLocked ? ["#FF6B6B", "#FF5252"] : ["#ffa500", "#ff6600"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons name="play" size={18} color="#fff" />
          <Text style={tw`text-white font-semibold ml-2`}>
            {isLocked ? "Locked" : "Practice Laugh"}
          </Text>
        </TouchableOpacity>
        <Text style={tw`text-white font-semibold ml-2 text-lg`}>
          Current Score: {selectedPersona.currentScore}
        </Text>
      </MotiView>
    );
  }

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 300 }}
      style={tw`flex-1 bg-black px-4`}
    >
      <View style={tw`flex-row justify-between items-center mb-5`}>
        <Text style={tw`text-white text-xl font-bold`}>Premium Laughs</Text>


        <View style={tw`flex-row items-center`}>
              <Text style={[tw`text-4xl font-bold`, { color: '#00ff87' }]}>3,300</Text>
              <Text style={[tw`ml-2`, { color: '#60efff' }]}>Current LMV</Text>
            </View>

      </View>

      <FlatList
        data={sortedLaughs}
        renderItem={renderRow}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-5`}
      />
    </MotiView>
  );
};

export default PremiumLaughs;
