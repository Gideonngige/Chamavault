import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function Location() {
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      // Fetch members' data from the Django API
      const fetchMembersLocation = async () => {
        setIsLoading(true); // Set loading state to true
        try {
          // Replace with your Django API URL
          const response = await axios.get('https://backend1-1cc6.onrender.com/get_all_locations/');
          setMembers(response.data); // Store the response data (list of members)
          console.log("Hello" + response.data[0].latitude);
          alert(response.data[0].latitude);
        } catch (error) {
          console.error("Error fetching members' locations:", error);
        }
        finally {
          setIsLoading(false); // Set loading state to false
        }
      };
  
      // Call the function to fetch data
      fetchMembersLocation();
    }, []); // Empty dependency array makes this effect run only once on mount

    if(isLoading) {
        return <Text>Loading...</Text>; // Show loading indicator while fetching data
    }


return(
  <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude:  0.1233503,
    longitude: 37.7215168,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }}
>
  {members.map((member) => (
    <Marker
      key={member.location_id}
      coordinate={{
        latitude: member.latitude,
        longitude: member.longitude,
      }}
      title={`Member: ${member.name}`}
    />
  ))}
</MapView>

);
}

