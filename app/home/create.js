import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const create = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [title,settitle] = useState("");

  const router = useRouter();
  const colors = [
    "#FF5733",
    "#FFD700",
    "#5D76A9",
    "#1877F2",
    "#32CD32",
    "#CCCCFF",
    "#$169E1",
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  async function addHabit(){
    try {
      const habitdetail = {
        title:title,
        color:selectedColor,
        repeatMode:"daily",
        reminder:true

      };

      const response = await axios.post("http://localhost:3000/habits",habitdetail);
      if(response.status === 200){
        settitle("");
        setSelectedColor("");
        Alert.alert("Habit added succesfully","Enjoy Practising")
      }

      console.log("Habit added : ",response)
      
    } catch (error) {
      console.log("Error adding a habit",error)
    }
  }


  return (
    <View style={{ padding: 10 }}>
      <Ionicons
        onPress={() => router.push("/home")}
        name="arrow-back"
        size={24}
        color="black"
      />
      <Text style={{ fontSize: 20, marginTop: 10 }}>
        Create <Text style={{ fontSize: 20, fontWeight: 500 }}>Habit</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={(text) => settitle(text)}
        style={{
          width: "95%",
          marginTop: 10,
          padding: 10,
          backgroundColor: "#E0FFFF",
          borderRadius: 10,
        }}
        placeholder="Title"
      ></TextInput>
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20 }}>Color</Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          {colors?.map((item, index) => (
            <TouchableOpacity onPress={() => setSelectedColor(item)} key={index} activeOpacity={0.8}>
              {selectedColor === item ? (<AntDesign name="plussquare" size={30} color={item} />)
                : (<FontAwesome name="square" size={30} color={item} />)}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={{ marginTop: 10, fontWeight: 500 }}>Repeat</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          gap: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            flex: 1,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#AFDBF5",
            flex: 1,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Weakly</Text>
        </Pressable>
      </View>
      <Text style={{ marginTop: 10, fontWeight: 500 }}>On this days</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        {days?.map((item, index) => (
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: "#E0E0E0",
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          Reminder
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "#2774AE",
          }}
        >
          Yes
        </Text>
      </View>
      <Pressable
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: "#00428c",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: "center", color: "#FFFFFF", fontWeight: "bold" }}
        >
          SAVE
        </Text>
      </Pressable>
    </View>
  );
};

export default create;

const styles = StyleSheet.create({});
