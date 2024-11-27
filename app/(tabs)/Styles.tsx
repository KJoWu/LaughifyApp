import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { laughStyles, Persona } from '@/constants/LaughStyles'; // Changed to match actual file name

const PersonaStylesMenu = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const renderPersona = ({ item }: { item: Persona }) => (
    <TouchableOpacity
      style={tw`w-1/3 p-2`}
      onPress={() => setSelectedPersona(item)}
    >
      <View style={tw`bg-gray-100 p-4 rounded-lg items-center`}>
        <Image
          source={item.image}
          style={tw`w-20 h-20 rounded-full mb-2`}
        />
        <Text style={tw`text-center font-semibold text-sm`}>{item.name}</Text>
        <Text style={tw`text-center text-gray-500 text-xs`}>Laugh Value: ${item.value}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold text-center mb-4`}>Persona Styles</Text>

      {selectedPersona && (
        <View style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
          <Image
            source={selectedPersona.image}
            style={tw`w-32 h-32 rounded-full self-center mb-4`}
          />
          <Text style={tw`text-xl font-bold text-center mb-2`}>
            {selectedPersona.name}
          </Text>
          <Text style={tw`text-lg text-green-700 text-center font-bold mb-2`}>
            Laugh Value: ${selectedPersona.value}
          </Text>
          <Text style={tw`text-sm text-gray-700 text-center mb-4`}>
            {selectedPersona.description}
          </Text>
          <TouchableOpacity
            onPress={() => console.log('Play Laugh:', selectedPersona.audio)}
            style={tw`bg-green-500 py-2 px-4 rounded-full self-center`}
          >
            <Text style={tw`text-white text-center font-bold`}>Play Laugh</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={laughStyles} // Use the imported laughStyles constant
        renderItem={renderPersona}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={tw`-mx-2`}
      />
    </View>
  );
};

export default PersonaStylesMenu;
