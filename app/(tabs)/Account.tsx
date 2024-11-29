import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'
import { useProtectedRoute } from '../_layout'
import { useRouter } from 'expo-router'

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
      // Instead of using router.replace, let the auth state change trigger the navigation
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
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="New Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update Username'}
          onPress={updateProfile}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={loading ? 'Loading ...' : 'Update Password'}
          onPress={updatePassword}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title={loading ? 'Signing Out...' : 'Sign Out'}
          onPress={handleSignOut}
          disabled={loading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
