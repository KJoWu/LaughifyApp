import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import tw from 'tailwind-react-native-classnames';
import { Redirect, useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        "Sign Up Successful",
        "Please check your email to verify your account.",
        [{ text: "OK" }]
      );
    }
    setLoading(false);
  }

  // Only redirect after mounted and we have a session
  if (mounted && session) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={tw`flex-1 bg-gray-900 p-6`}>
      <View style={tw`max-w-sm w-full mx-auto space-y-8 mt-10`}>
        {/* Header Section */}
        <View style={tw`space-y-2`}>
          <Text style={tw`text-4xl font-bold text-white text-center`}>
            RichLaughify
          </Text>
          <Text style={tw`text-gray-400 text-center mb-10`}>
            Sign in to your account to continue
          </Text>
        </View>

        {/* Input Fields */}
        <View style={tw`space-y-4 mt-10`}>
          <View style={tw`space-y-2`}>
            <Text style={tw`text-gray-300 text-sm font-medium`}>Email</Text>
            <TextInput
              style={tw`mt-2 w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500`}
              placeholder="Enter your email"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={tw`space-y-2`}>
            <Text style={tw`mt-5 text-gray-300 text-sm font-medium`}>Password</Text>
            <TextInput
              style={tw`mt-2 w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500`}
              placeholder="Enter your password"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => router.push('/recover-password')}>
              <Text style={tw`text-blue-500 text-sm text-right mt-2`}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons Section with Spacing */}
        <View style={tw`space-y-4 mt-12`}>
          <TouchableOpacity
            style={tw`w-full bg-blue-600 py-3 rounded-lg items-center shadow-lg ${loading ? 'opacity-50' : ''}`}
            onPress={signInWithEmail}
            disabled={loading}
          >
            <Text style={tw`text-white font-semibold`}>
              {loading ? 'Loading...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`mt-3 w-full bg-gray-800 py-3 rounded-lg items-center border border-gray-700 shadow-lg ${loading ? 'opacity-50' : ''}`}
            onPress={signUpWithEmail}
            disabled={loading}
          >
            <Text style={tw`text-white font-semibold`}>
              {loading ? 'Loading...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
