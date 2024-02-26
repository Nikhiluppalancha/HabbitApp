import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

const index = () => {
  const [option, SetOption] = useState("Today");
  const [habits, sethabits] = useState([]);

  useEffect(() => {
    fetchHabits()
  }, [])

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://localhost:3000/habitslist");
      console.log('hello ---',response.data)
      sethabits(response.data)
    } catch (error) {
      console.log("Error fetching the habits", error)
    }
  }
  console.log("Habits :", habits)
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "White", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Ionicons name="logo-foursquare" size={24} color="black" />
        <AntDesign
          onPress={() => router.push("/home/create")}
          name="plus"
          size={24}
          color="black"
        />
      </View>
      <Text style={{ fontWeight: "400", fontSize: 25, marginTop: 5 }}>
        Habits
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginVertical: 8,
        }}
      >
        <Pressable
          onPress={() => SetOption("Today")}
          style={{
            backgroundColor: option == "Today" ? "#E0FFFF" : "transparent",
            borderRadius: 25,
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Today
          </Text>
        </Pressable>
        <Pressable
          onPress={() => SetOption("Weekly")}
          style={{
            backgroundColor: option == "Weekly" ? "#E0FFFF" : "transparent",
            borderRadius: 25,
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Weekly
          </Text>
        </Pressable>
        <Pressable
          onPress={() => SetOption("Overall")}
          style={{
            backgroundColor: option == "Overall" ? "#E0FFFF" : "transparent",
            borderRadius: 25,
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "grey", fontSize: 14 }}>
            Overall
          </Text>
        </Pressable>
      </View>

      {option == "Today" && habits?.length > 0 ? (
        <View>
   {habits?.map((item, index) =>(

    <Pressable style={{ 
      marginVertical:10,
      backgroundColor: item?.color,
      padding: 12, 
      borderRadius:25
         }}>
      <Text style={{ 
        textAlign:"center",
        fontWeight:"600"
         }} >{item?.title}</Text>
    </Pressable>

   ) )}

        </View>
      ) : (
        <View>

          <Text style={{ textAlign: "center", fontWeight: "600", fontSize: 20 }}>No habits for today</Text>

          <Pressable 
           onPress={() => router.push("/home/create")}
          style={{ marginLeft:"auto",marginRight:"auto", backgroundColor: "#0071c5", marginTop: 20, paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text>Create</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
