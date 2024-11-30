import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useProtectedRoute } from '../_layout';
import Svg, { Path, LinearGradient, Stop, Defs } from 'react-native-svg';

export default function TabIndex() {
  useProtectedRoute();

  // Data points for the line graph
  const data = [40, 60, 30, 80, 50, 70, 45];
  const maxHeight = 100;
  
  // Calculate points for the smooth line
  const points = data.map((value, index) => {
    const x = (index * (900 / 6)); // Divide width by number of points - 1
    const y = ((maxHeight - value) * 0.8); // Scale to fit in container
    return `${x},${y}`;
  }).join(' ');

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      <View style={tw`px-4`}>
        {/* Weekly Stats Card */}
        <View style={tw`bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-6 mb-6 mt-4`}>
          <Text style={tw`text-white text-lg font-bold mb-2`}>Welcome Rich!</Text>
          <Text style={tw`text-white text-3xl font-bold`}>3 Laughs</Text>
          <Text style={tw`text-gray-200 mt-1 mb-4`}>This Week</Text>
          
          {/* Line Graph */}
          <View style={tw`h-32 mt-2`}>
            <Svg height="100%" width="100%" viewBox="0 0 900 100">
              <Defs>
                <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#4ade80" />
                  <Stop offset="100%" stopColor="#facc15" />
                </LinearGradient>
                <LinearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
                </LinearGradient>
              </Defs>
              
              {/* Fill area under the line */}
              <Path
                d={`M 0,${((maxHeight - data[0]) * 0.8)} ${points} L 900,100 L 0,100 Z`}
                fill="url(#fillGradient)"
              />
              
              {/* Line */}
              <Path
                d={`M 0,${((maxHeight - data[0]) * 0.8)} ${points}`}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
              />
            </Svg>
          </View>

          {/* Days of week */}
          <View style={tw`flex-row justify-between mt-2`}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={tw`text-white text-xs`}>{day}</Text>
            ))}
          </View>
        </View>

        {/* LAugh Market Value Card */}
        <View style={tw`bg-gradient-to-r from-green-600 to-yellow-600 rounded-2xl p-6 mb-6`}>
          <Text style={tw`text-gray-100 text-sm mb-2`}>Current LAugh Market Value</Text>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-white text-4xl font-bold`}>8,000</Text>
            <Text style={tw`text-white ml-2`}>LMV</Text>
          </View>
          <Text style={tw`text-gray-100 text-sm mt-2`}>+12% from last week</Text>
        </View>

        {/* Scenario of the Day */}
        <View style={tw`bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl p-6 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-white text-lg font-bold`}>Scenario of the Day</Text>
            <View style={tw`bg-black bg-opacity-30 rounded-full px-3 py-1`}>
              <Text style={tw`text-white text-xs`}>NEW</Text>
            </View>
          </View>
          <Text style={tw`text-white text-base mb-3`}>
            "You're at a comedy show and the comedian tells a joke that's only mildly funny"
          </Text>
          <TouchableOpacity style={tw`bg-black bg-opacity-30 rounded-xl p-3 flex-row justify-center`}>
            <Text style={tw`text-white font-bold`}>Practice This Scenario</Text>
          </TouchableOpacity>
        </View>

        {/* Laugh Tip of the Day */}
        <View style={tw`bg-gradient-to-r from-green-400 to-yellow-400 rounded-2xl p-6 mb-6`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Text style={tw`text-white text-lg font-bold`}>Laugh Tip of the Day</Text>
            <View style={tw`bg-black bg-opacity-30 rounded-full px-3 py-1 ml-3`}>
              <Text style={tw`text-white text-xs`}>PRO TIP</Text>
            </View>
          </View>
          <Text style={tw`text-white text-base`}>
            "Start with a gentle 'ha' and gradually increase to 'HA' for a more authentic laugh. This creates a natural progression that others find more genuine."
          </Text>
        </View>

        {/* Practice Section */}
        <View style={tw`bg-gradient-to-r from-yellow-600 to-green-600 rounded-2xl p-6 mb-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-xl font-bold`}>Practice Mode</Text>
            <View style={tw`bg-black bg-opacity-30 rounded-full px-3 py-1`}>
              <Text style={tw`text-white text-sm`}>AI Powered</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={tw`bg-black bg-opacity-30 p-4 rounded-xl flex-row items-center justify-center`}
          >
            <Text style={tw`text-white text-lg font-bold`}>Practice with AILAughfred</Text>
          </TouchableOpacity>
          
          <Text style={tw`text-gray-100 text-sm mt-4 text-center`}>
            Improve your laugh with personalized AI coaching
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
