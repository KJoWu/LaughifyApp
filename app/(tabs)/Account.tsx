import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { View, Alert, Text, TextInput, TouchableOpacity } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { useProtectedRoute } from '../_layout'
import { useRouter } from 'expo-router'
import tw from 'tailwind-react-native-classnames'

export default function Account() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useProtectedRoute()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) getProfile(session)
    })
  }, [])

  async function getProfile(session: Session) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', session?.user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }

      Alert.alert('Success', 'Your username has been updated successfully!')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Failed to update username: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updatePassword() {
    try {
      setLoading(true)
      if (!password) throw new Error('Password cannot be empty.')

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      Alert.alert('Success', 'Your password has been updated successfully!')
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', `Failed to update password: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true)
      await supabase.auth.signOut()
      setSession(null)
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={tw`flex-1 bg-black px-4 pt-12`}>
      <Text style={tw`text-white text-2xl font-bold mb-8`}>Account Settings</Text>
      
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-400 text-sm mb-2`}>Email</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-4 rounded-lg`}
          value={session?.user?.email}
          editable={false}
        />
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-400 text-sm mb-2`}>Username</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-4 rounded-lg`}
          value={username || ''}
          onChangeText={setUsername}
          placeholderTextColor="#4B5563"
        />
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-400 text-sm mb-2`}>New Password</Text>
        <TextInput
          style={tw`bg-gray-900 text-white p-4 rounded-lg`}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#4B5563"
        />
      </View>

      <TouchableOpacity
        style={tw`bg-green-600 p-4 rounded-lg mb-4 ${loading ? 'opacity-50' : ''}`}
        onPress={updateProfile}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Loading...' : 'Update Username'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-green-600 p-4 rounded-lg mb-4 ${loading ? 'opacity-50' : ''}`}
        onPress={updatePassword}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Loading...' : 'Update Password'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw` p-4 rounded-lg ${loading ? 'opacity-50' : ''}`}
        onPress={handleSignOut}
        disabled={loading}
      >
        <Text style={tw`text-white text-center font-bold`}>
          {loading ? 'Signing Out...' : 'Sign Out'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
