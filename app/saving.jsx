import { SafeAreaView, ScrollView, Text, View, TouchableOpacity,Image } from 'react-native';
import { useRouter } from "expo-router";
import { DataTable } from "react-native-paper";
import NavBar from "./NavBar";
export default function Home() {
  const router = useRouter();
  const data = [
    { id: "1", name: "John Doe", age: 28, city: "New York" },
    { id: "2", name: "Jane Smith", age: 32, city: "Los Angeles" },
    { id: "3", name: "Michael Johnson", age: 24, city: "Chicago" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <View className="flex-row justify-between items-start mb-6 ">
        <View className="w-full p-4 bg-white">
      <DataTable>
        {/* Table Header */}
        <DataTable.Header className="bg-blue-500">
          <DataTable.Title textStyle={{ color: "white", fontWeight: "bold" }}>Name</DataTable.Title>
          <DataTable.Title textStyle={{ color: "white", fontWeight: "bold" }}>Age</DataTable.Title>
          <DataTable.Title textStyle={{ color: "white", fontWeight: "bold" }}>City</DataTable.Title>
        </DataTable.Header>

        {/* Table Rows */}
        <DataTable.Row>
          <DataTable.Cell>John Doe</DataTable.Cell>
          <DataTable.Cell>28</DataTable.Cell>
          <DataTable.Cell>New York</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Jane Smith</DataTable.Cell>
          <DataTable.Cell>32</DataTable.Cell>
          <DataTable.Cell>Los Angeles</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Michael Johnson</DataTable.Cell>
          <DataTable.Cell>24</DataTable.Cell>
          <DataTable.Cell>Chicago</DataTable.Cell>
        </DataTable.Row>

      </DataTable>
    </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}