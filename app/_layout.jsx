import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NotificationIcon from './NotificationIcon';
import AdminNotification from "./AdminNotification";

export default function RootLayout() {
  return(
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:true}}>
        <Stack.Screen name="index"options={{title:"Welcome"}}  />
        <Stack.Screen name="login"options={{title:"Login"}}  />
        <Stack.Screen name="home"options={{title:"ChamaVault",  headerRight: () => <NotificationIcon/>}}  />
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
        <Stack.Screen name="contribution"options={{title:"Contribution"}}  />
        <Stack.Screen name="successfully"options={{title:"Successfully"}}  />
        <Stack.Screen name="invitation"options={{title:"Invitation"}}  />
        <Stack.Screen name="creditscore"options={{title:"Credit Score"}}  />
        <Stack.Screen name="chamaexpenses"options={{title:"Chama Expenses"}}  />
        <Stack.Screen name="invest"options={{title:"Invest"}}  />
        <Stack.Screen name="activity"options={{title:"Activity"}}  />
        <Stack.Screen name="poll"options={{title:"Poll"}}  />
        <Stack.Screen name="activepolls"options={{title:"Active Polls"}}  />
        <Stack.Screen name="schedule"options={{title:"Schedule"}}  />
        <Stack.Screen name="topupinvestment"options={{title:"Top Up Investment"}}  />
        <Stack.Screen name="notifications"options={{title:"Notifications"}}  />
        <Stack.Screen name="profile"options={{title:"Profile"}}  />
        <Stack.Screen name="help"options={{title:"Help"}}  />
        <Stack.Screen name="admin"options={{title:"Admin", headerRight: () => <AdminNotification/>}}  />
        <Stack.Screen name="chat"options={{title:"Chat"}}  />
        <Stack.Screen name="manageroles"options={{title:"Manage Roles"}}  />
        <Stack.Screen name="managemembers"options={{title:"Manage Members"}}  />
        <Stack.Screen name="payloan"options={{title:"Pay Loan"}}  />
        <Stack.Screen name="updateprofile"options={{title:"Update Profile"}}  />
        <Stack.Screen name="joinchama"options={{title:"Join Chama"}}  />
        <Stack.Screen name="forgotpassword"options={{title:"Forgot Password"}}  />
        <Stack.Screen name="terms"options={{title:"Terms & Conditions"}}  />
        <Stack.Screen name="location"options={{title:"Location"}}  />
        <Stack.Screen name="defaulters"options={{title:"Defaulters"}}  />
        <Stack.Screen name="contributiondate"options={{title:"Contribution Date"}}  />
        <Stack.Screen name="investment"options={{title:"Investments"}}  />
        
        
      </Stack>
    </SafeAreaProvider>
  )
}