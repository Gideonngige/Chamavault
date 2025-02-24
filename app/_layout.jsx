import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return(
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:true}}>
        <Stack.Screen name="index"options={{title:"Login"}}  />
        <Stack.Screen name="home"options={{title:"ChamaVault"}}  />
        <Stack.Screen name="verify"options={{title:"Verify"}}  />
        <Stack.Screen name="register"options={{title:"Register"}}  />
        <Stack.Screen name="saving"options={{title:"Saving"}}  />
        <Stack.Screen name="loan"options={{title:"Loans"}}  />
        <Stack.Screen name="createchama"options={{title:"Create Chama"}}  />
        <Stack.Screen name="chamacreated"options={{title:"Chama Created"}}  />
      </Stack>
    </SafeAreaProvider>
  )
}