import { Tabs, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { View, Text, Animated } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

interface TabIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
}

export default function TabLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (isLoading || !mounted) {
    return <View style={tw`flex-1 bg-black`} />;
  }

  // Only redirect after mounted and we know there's no session
  if (mounted && !session) {
    return <Redirect href="/" />;
  }

  const TabIcon = ({ name, color, size, focused }: TabIconProps) => {
    const scaleValue = new Animated.Value(1);

    useEffect(() => {
      if (focused) {
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.4,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 150,
            useNativeDriver: true,
          })
        ]).start();
      } else {
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }, [focused]);

    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Ionicons name={name} size={size} color={color} />
      </Animated.View>
    );
  };

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row justify-between items-center px-4 pt-8 pb-2 bg-black`}>

      <Text
        style={[
          tw`text-2xl font-bold text-yellow-400`,
          {
            textShadowColor: 'rgba(255, 223, 0, 0.8)', // Bright yellow glow
            textShadowOffset: { width: 0, height: 0 }, // No directional shadow
            textShadowRadius: 10, // Glow radius
          },
        ]}
      >
        RichLaughify
      </Text>



      </View>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon name="home-outline" size={size} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Practice"
          options={{
            tabBarLabel: 'Practice',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon name="mic-outline" size={size} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="PremiumLaughs"
          options={{
            tabBarLabel: 'Premium',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon name="star-outline" size={size} color={color} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="Account"
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon name="person-outline" size={size} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
