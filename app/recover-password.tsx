import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import tw from 'tailwind-react-native-classnames';
import { useRouter } from 'expo-router';

export default function RecoverPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function resetPassword() {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Recovery Email Sent",
        "Please check your email for the password reset link. After clicking the link, you'll be able to set a new password.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    }
    setLoading(false);
  }

  return (
    <View style={tw`flex-1 bg-gray-900 p-6`}>
      <View style={tw`max-w-sm w-full mx-auto space-y-8 mt-10`}>
        {/* Header Section */}
        <View style={tw`space-y-2`}>
          <Text style={tw`text-4xl font-bold text-white text-center`}>
            Recover Password
          </Text>
          <Text style={tw`text-gray-400 text-center mb-10`}>
            Enter your email to receive recovery instructions
          </Text>
        </View>

        {/* Input Field */}
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
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Buttons Section */}
        <View style={tw`space-y-4 mt-12`}>
          <TouchableOpacity
            style={tw`w-full bg-blue-600 py-3 rounded-lg items-center shadow-lg ${loading ? 'opacity-50' : ''}`}
            onPress={resetPassword}
            disabled={loading}
          >
            <Text style={tw`text-white font-semibold`}>
              {loading ? 'Sending...' : 'Send Recovery Email'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`mt-3 w-full py-3 rounded-lg items-center`}
            onPress={() => router.back()}
            disabled={loading}
          >
            <Text style={tw`text-gray-400 font-semibold`}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
