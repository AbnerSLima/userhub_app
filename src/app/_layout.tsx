import { Stack } from 'expo-router'

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
      name="index"
      options={{ headerShown: false }}
      />

      <Stack.Screen
        name="signup"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="profile"
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="edit"
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="create"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}