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
        <Stack.Screen name="chama"options={{title:"Chama"}}  />
        <Stack.Screen name="members"options={{title:"Members"}}  />
        <Stack.Screen name="appliedloans"options={{title:"Applied Loans"}}  />
        <Stack.Screen name="applyloan"options={{title:"Apply Loan"}}  />
        <Stack.Screen name="contributions"options={{title:"Contributions"}}  />
        <Stack.Screen name="successfully"options={{title:"Successfully"}}  />
        <Stack.Screen name="invitation"options={{title:"Invitation"}}  />
        <Stack.Screen name="creditscore"options={{title:"Credit Score"}}  />
        <Stack.Screen name="chamaexpenses"options={{title:"Chama Expenses"}}  />
        <Stack.Screen name="invest"options={{title:"Invest"}}  />
        <Stack.Screen name="activity"options={{title:"Activity"}}  />
        <Stack.Screen name="poll"options={{title:"Poll"}}  />
        <Stack.Screen name="activepolls"options={{title:"Active Polls"}}  />
        
      </Stack>
    </SafeAreaProvider>
  )
}