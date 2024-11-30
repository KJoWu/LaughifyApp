import { ScrollView, View, Text, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useProtectedRoute } from '../_layout';
import Svg, { Path, LinearGradient as SvgGradient, Stop, Defs } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBadgeProps {
  text: string;
  style?: StyleProp<ViewStyle>;
}

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

  const GradientBadge = ({ text, style }: GradientBadgeProps) => (
    <View 
      style={[
        tw`rounded-full px-3 py-1 justify-center items-center bg-black bg-opacity-60`, 
        { minHeight: 24 }, 
        style
      ]}
    >
      <Text style={[tw`text-white text-xs`, { textAlign: 'center' }]}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      <View style={tw`px-4`}>
        {/* Weekly Stats Card */}
        <View style={tw`bg-gradient-to-r from-green-500 to-yellow-500 rounded-2xl p-6 mb-6 mt-4`}>
          <Text style={tw`text-white text-lg font-bold mb-2`}>Welcome Rich!</Text>
          <Text style={tw`text-white text-3xl font-bold`}>3 Laughs</Text>
          <Text style={tw`text-gray-200 mt-1`}>This Week</Text>
          
          <View style={tw`h-15 mt-2`}>
            <Svg height="100%" width="100%" viewBox="0 0 800 100">
              <Defs>
                <SvgGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#4ade80" />
                  <Stop offset="100%" stopColor="#facc15" />
                </SvgGradient>
                <SvgGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
                  <Stop offset="100%" stopColor="#facc15" stopOpacity="0.1" />
                </SvgGradient>
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
          <View style={tw`flex-row justify-between pt-2`}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={tw`text-white text-xs`}>{day}</Text>
            ))}
          </View>
        </View>

        {/* LAugh Market Value Card */}
        <LinearGradient
          colors={['#00ff87', '#60efff', '#00ff87']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            tw`rounded-2xl p-0.5 mb-6`,
            { 
              shadowColor: '#00ff87',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 3
            }
          ]}
        >
          <View style={[tw`bg-gray-900 rounded-2xl p-6`]}>
            <Text style={[tw`text-sm mb-2`, { color: '#60efff' }]}>Current Laugh Market Value</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={[tw`text-4xl font-bold`, { color: '#00ff87' }]}>8,000</Text>
              <Text style={[tw`ml-2`, { color: '#60efff' }]}>LMV</Text>
            </View>
            <Text style={[tw`text-sm mt-2`, { color: '#00ff87' }]}>+12% from last week</Text>
          </View>
        </LinearGradient>

        {/* Scenario of the Day */}
        <LinearGradient
          colors={['#FFE66D', '#FF6B6B']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`rounded-2xl p-6 mb-6`}
        >
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={[tw`text-lg font-bold`, { color: 'bg-gray-900' }]}>Scenario of the Day</Text>
            <GradientBadge 
              text="NEW" 
              style={{ minWidth: 50 }}
            />
          </View>
          <Text style={[tw`text-base mb-3`, { color: 'bg-gray-900' }]}>
          You're on your yacht, sipping $10,000 whiskey, and someone tells a joke that's so bad you briefly consider laughing then buying their company just to fire them. </Text>
          <TouchableOpacity style={tw`bg-black bg-opacity-50 rounded-xl p-3 flex-row justify-center`}>
            <Text style={[tw`font-bold`, { color: 'white' }]}>Practice This Scenario</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Laugh Tip of the Day */}
        <LinearGradient
          colors={['#4CAF50', '#8BC34A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`rounded-2xl p-6 mb-6`}
        >
          <View style={tw`flex-row items-center mb-3`}>
            <Text style={tw`text-gray-800 text-lg font-bold`}>Laugh Tip of the Day</Text>
            <GradientBadge 
              text="PRO TIP" 
              style={{ minWidth: 70, marginLeft: 12 }}
            />
          </View>
          <Text style={tw`text-gray-800 text-base`}>
            "Start with a gentle 'ha' and gradually increase to 'HA' for a more authentic laugh. This creates a natural progression that others find more genuine."
          </Text>
        </LinearGradient>

        {/* Practice Section */}
        <LinearGradient
          colors={['#2196F3', '#00BCD4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={tw`rounded-2xl p-6 mb-6`}
        >
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-xl font-bold`}>Practice Mode</Text>
            <GradientBadge 
              text="AI Powered" 
              style={{ minWidth: 90 }}
            />
          </View>
          
          <TouchableOpacity 
            style={tw`bg-black bg-opacity-50 p-4 rounded-xl flex-row items-center justify-center`}
          >
            <Text style={tw`text-white text-lg font-bold`}>Practice with Opulaugh</Text>
          </TouchableOpacity>
          
          <Text style={tw`text-gray-100 text-sm mt-4 text-center`}>
            Improve your laugh with personalized AI coaching
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
