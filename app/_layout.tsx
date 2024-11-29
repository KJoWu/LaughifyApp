import { Stack, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function Layout() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <View style={tw`flex-1 bg-gray-900`} />
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="index"
          redirect={!!session}
        />
        <Stack.Screen 
          name="(tabs)"
          redirect={!session}
        />
        <Stack.Screen name="recover-password" />
      </Stack>
    </View>
  );
}

export function useProtectedRoute() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Redirect href="/" />;
  }

  return null;
}
