import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)/dashboard');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-8 py-12">
          {/* Header Section */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-blue-600 rounded-full items-center justify-center mb-6 shadow-lg">
              <Ionicons name="medical" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              AdhereTrack
            </Text>
            <Text className="text-base text-gray-600 text-center">
              Welcome back! Please sign in to continue
            </Text>
          </View>

          {/* Login Form */}
          <View className="space-y-6">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-base text-gray-800 shadow-sm"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="#9CA3AF"
                />
                <View className="absolute right-4 top-4">
                  <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 pr-12 text-base text-gray-800 shadow-sm"
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="self-end">
              <Text className="text-sm text-blue-600 font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              className={`w-full py-4 rounded-xl items-center justify-center shadow-lg ${
                loading 
                  ? 'bg-gray-400' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
            >
              {loading ? (
                <View className="flex-row items-center">
                  <View className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  <Text className="text-white font-semibold text-base">
                    Signing In...
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-semibold text-base">
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Alternative Login Options */}
            <View className="items-center my-6">
              <View className="flex-row items-center w-full">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="mx-4 text-sm text-gray-500">
                  Or continue with
                </Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row space-x-4">
              <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-xl py-3 items-center justify-center shadow-sm">
                <Ionicons name="logo-google" size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border border-gray-300 rounded-xl py-3 items-center justify-center shadow-sm">
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-8">
              <Text className="text-gray-600 text-base">
                Dont have an account? 
              </Text>
              <TouchableOpacity 
                onPress={() => router.push('/(auth)/signup')}
                className="ml-1"
              >
                <Text className="text-blue-600 font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center pb-8">
          <Text className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
