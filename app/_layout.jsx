import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotificationIcon from './NotificationIcon';
import AdminNotification from "./AdminNotification";

export default function RootLayout() {
  return(
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:true}}>
        <Stack.Screen name="index"options={{title:""}}  />
        <Stack.Screen name="login"options={{title:"Login"}}  />
        <Stack.Screen name="home"options={{title:"ChamaVault",  headerRight: () => <NotificationIcon/>}}  />
        <Stack.Screen name="register"options={{title:"Register"}}  />
        <Stack.Screen name="saving"options={{title:"Saving"}}  />
        <Stack.Screen name="loan"options={{title:"Loans"}}  />
        <Stack.Screen name="createchama"options={{title:"Create Chama"}}  />
        <Stack.Screen name="chamacreated"options={{title:"Chama Created"}}  />
        <Stack.Screen name="chama"options={{title:"Chama"}}  />
        <Stack.Screen name="members"options={{title:"Members"}}  />
        <Stack.Screen name="applyloan"options={{title:"Apply Loan"}}  />
        <Stack.Screen name="contribution"options={{title:"Contribution"}}  />
        <Stack.Screen name="invitation"options={{title:"Invitation"}}  />
        <Stack.Screen name="addsavings"options={{title:"Add Savings"}}  />
        <Stack.Screen name="notifications"options={{title:"Notifications"}}  />
        <Stack.Screen name="profile"options={{title:"Profile"}}  />
        <Stack.Screen name="help"options={{title:"Help"}}  />
        <Stack.Screen name="admin"options={{title:"Admin", headerRight: () => <AdminNotification/>}}  />
        <Stack.Screen name="manageroles"options={{title:"Manage Roles"}}  />
        <Stack.Screen name="payloan"options={{title:"Pay Loan"}}  />
        <Stack.Screen name="updateprofile"options={{title:"Update Profile"}}  />
        <Stack.Screen name="joinchama"options={{title:"Join Chama"}}  />
        <Stack.Screen name="forgotpassword"options={{title:"Forgot Password"}}  />
        <Stack.Screen name="terms"options={{title:"Terms & Conditions"}}  />
        <Stack.Screen name="insurance"options={{title:"Insurance"}}  />
        <Stack.Screen name="availablechamas"options={{title:"Available Chamas"}}  />
        <Stack.Screen name="addloans"options={{title:"Add Loans"}}  />
        
        
      </Stack>
    </SafeAreaProvider>
  )
}