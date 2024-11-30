import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import tw from 'tailwind-react-native-classnames';
import { scenarios, Scenario } from '../../constants/LaughStyles';
import { useProtectedRoute } from '../_layout';
import { Ionicons } from '@expo/vector-icons';

export default function Practice() {
  useProtectedRoute();

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  // Cleanup audio resources
  React.useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const renderScenario = ({ item }: { item: Scenario }) => {
    const isLocked = item.laughValue > 3000;

    return (
      <View 
        style={[
          tw`p-4 rounded-lg mb-4 shadow-lg border-2`,
          isLocked 
            ? tw`bg-gray-800 border-red-500 border-opacity-50` 
            : tw`bg-gray-800 border-teal-400 border-opacity-30`
        ]}
      >
        <View style={tw`relative`}>
          <Image
            source={item.image}
            style={[
              tw`w-full h-48 rounded-lg`,
              isLocked && tw`opacity-50`
            ]}
            resizeMode="cover"
          />
          {isLocked && (
            <View style={tw`absolute right-2 top-2 bg-black bg-opacity-70 p-2 rounded-full`}>
              <Ionicons name="lock-closed" size={24} color="#FF6B6B" />
            </View>
          )}
        </View>
        
        <View style={tw`flex-row justify-between items-center mt-4`}>
          <Text style={tw`text-white text-lg font-bold flex-1`}>
            <Ionicons 
              name="diamond-outline" 
              size={16} 
              color={isLocked ? "#FF6B6B" : "#4ECDC4"} 
            /> 
            <Text style={isLocked ? tw`text-red-400` : tw`text-teal-400`}>
              MLV {item.laughValue}
            </Text>
            <Text style={tw`text-white`}> : {item.name}</Text>
          </Text>
        </View>

        <Text 
          style={[
            tw`mt-2`,
            isLocked ? tw`text-gray-500` : tw`text-gray-300`
          ]}
        >
          {item.description}
        </Text>

        {isLocked && (
          <Text style={tw`text-red-400 mt-2 text-sm`}>
            Unlock this scenario by achieving a higher Laugh Market Value (LMV)
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={tw`flex-1 bg-black pt-10 px-4`}>
      <Text style={tw`text-white text-2xl text-center font-bold mb-4`}>
        Select Your Scenario
      </Text>
      <FlatList
        data={scenarios}
        keyExtractor={(item) => item.id}
        renderItem={renderScenario}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
