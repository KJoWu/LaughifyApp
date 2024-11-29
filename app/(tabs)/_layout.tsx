import { Tabs, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';

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

  return (
    <View style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row justify-between items-center px-4 pt-8 pb-2 bg-black`}>
        <Text style={tw`text-white text-2xl font-bold`}>Laff</Text>
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
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="Practice" 
          options={{
            tabBarLabel: 'Practice',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="mic-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="PremiumLaughs" 
          options={{
            tabBarLabel: 'Laughs',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="Account" 
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
