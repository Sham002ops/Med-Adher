import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      // After a successful registration, sign in the user directly
      await signIn(email, password); 
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Signup Failed', 'Could not create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center px-8 py-12">
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-6 shadow-lg">
              <Ionicons name="person-add-outline" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">Sign Up</Text>
            <Text className="text-base text-gray-600 text-center">Create your AdhereTrack account</Text>
          </View>

          <View className="space-y-6">
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Full Name</Text>
              <TextInput
                placeholder="Your name"
                value={name}
                onChangeText={setName}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-gray-800 shadow-sm"
                autoCapitalize="words"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-gray-800 shadow-sm"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-gray-800 shadow-sm"
                secureTextEntry
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              onPress={handleSignup}
              disabled={loading}
              className={`w-full py-4 rounded-xl items-center justify-center shadow-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 active:bg-blue-700'}`}
            >
              <Text className="text-white font-semibold text-base">
                {loading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600 text-base">Already have an account?</Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/login')} className="ml-1">
                <Text className="text-blue-600 font-semibold text-base">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

