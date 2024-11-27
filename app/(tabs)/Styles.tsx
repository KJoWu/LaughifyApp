import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { laughStyles, Persona } from '@/constants/LaughStyles'; // Adjusted to match file structure

const PersonaStylesMenu = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const renderPersona = ({ item }: { item: Persona }) => (
    <TouchableOpacity
      style={tw`flex-row items-center bg-gray-800 p-4 mb-2 rounded-lg`}
      onPress={() => setSelectedPersona(item)}
    >
      <Image
        source={item.image}
        style={tw`w-16 h-16 rounded-full mr-4`}
      />
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-semibold text-white`}>
          {item.name}
        </Text>
        <Text style={tw`text-yellow-400 text-sm`}>
          Laugh Value: ${item.value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      {selectedPersona && (
        <View style={tw`bg-gray-900 p-4 rounded-lg mb-4 items-center`}>
          <Image
            source={selectedPersona.image}
            style={tw`w-32 h-32 rounded-full mb-4`}
          />
          <View style={tw`w-full px-4`}>
            <Text style={tw`text-xl font-bold mb-2 text-white text-center`}>
              {selectedPersona.name}
            </Text>
            <Text style={tw`text-lg text-emerald-400 font-bold mb-2 text-center`}>
              Laugh Value: ${selectedPersona.value}
            </Text>
            <Text style={tw`text-sm text-gray-400 mb-4 text-center`}>
              {selectedPersona.description}
            </Text>
            <TouchableOpacity
              onPress={() => console.log('Play Laugh:', selectedPersona.audio)}
              style={tw`bg-emerald-500 py-2 px-6 rounded-full mb-2`}
            >
              <Text style={tw`text-white font-bold text-center`}>Play Laugh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Practice Laugh:', selectedPersona.audio)}
              style={tw`bg-gray-700 py-2 px-6 rounded-full`}
            >
              <Text style={tw`text-white font-bold text-center`}>Practice Laugh</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={laughStyles}
        renderItem={renderPersona}
        keyExtractor={(item) => item.id}
        numColumns={1} // Ensure single-column list
        style={tw`-mx-2`}
      />
    </View>
  );
};

export default PersonaStylesMenu;
