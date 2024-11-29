import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import tw from 'tailwind-react-native-classnames';
import { scenarios, Scenario } from '../../constants/LaughStyles';
import { useProtectedRoute } from '../_layout';

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

  const renderScenario = ({ item }: { item: Scenario }) => (
    <View style={tw`bg-gray-800 p-4 rounded-lg mb-4 shadow-lg`}>
      <Image
        source={item.image}
        style={tw`w-full h-48 rounded-lg`}
        resizeMode="cover"
      />
      <Text style={tw`text-white text-lg font-bold mt-4`}>{item.name}</Text>
      <Text style={tw`text-gray-400 mt-2`}>{item.description}</Text>

        <Text style={tw`text-white text-center`}>Play Sound</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-black pt-10 px-4`}>
      <Text style={tw`text-white text-2xl text-center font-bold mb-4`}>
        Pick a Scenario
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
