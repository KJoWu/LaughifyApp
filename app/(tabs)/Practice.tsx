import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useProtectedRoute } from '../_layout';

export default function Practice() {
  useProtectedRoute();

  return (
    <View style={tw`flex-1 bg-black pt-20`}>
      <Text style={tw`text-white text-xl text-center`}>Practice Screen</Text>
    </View>
  );
}
