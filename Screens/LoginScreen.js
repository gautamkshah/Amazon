import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from "react-native";
  import { React, useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import amazonLogo from "../assets/images/amazon.png";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
  
  
    useEffect(()=>{
      const checkLogin=async()=>{
  
        try{
          const token=await AsyncStorage.getItem("authToken");
          if(token){
            navigation.replace("Main");
          }
        }catch(error){
          console.log("Error in getting token");
        }
      }
      checkLogin();
    }
    ,[]);
  
    const handleLogin=()=>{
      console.log(email);
      const user={
        email:email,
        password:password
      }
      axios.post("http://192.168.1.5:8000/login",user).then
      ((response)=>{
        console.log(response);
        const token=response.data.token;
        AsyncStorage.setItem("authToken",token);
        navigation.replace("Main");
  
      }).catch((error)=>{
       
        console.log("Login failed",error);
      });
  
    }
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          padding: "20",
        }}
      >
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image source={amazonLogo} style={{ width: 250, height: 100 }} />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 12,
                alignItems: "center",
                color: "#041E42",
              }}
            >
              Login to your Account
            </Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
                width: 350,
              }}
            >
              <MaterialIcons
                name="email"
                size={24}
                color="gray"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter your Email"
                style={{ fontSize: 20, color: "gray", marginVertical: 10 }}
              />
            </View>
          </View>
  
          <View style={{ marginTop: 2 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#D0D0D0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
                width: 350,
              }}
            >
              <AntDesign
                name="lock1"
                size={24}
                color="gray"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter your Password"
                style={{ fontSize: 20, color: "gray", marginVertical: 10 }}
              />
            </View>
          </View>
  
          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: 500 }}>
              Forget Password
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }} />
  
          <Pressable
            onPress={handleLogin}
            style={{
              
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
              alignItems: "center",
            }}
          >
            <Text
              style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
            >
              {" "}
              Login{" "}
            </Text>
          </Pressable>
  
          <Pressable onPress={()=>navigation.navigate("Register")} style={{ marginTop: 20,alignItems:"center" }}>
            <Text style={{ fontSize: 16, color: "#007FFF", fontWeight: 500 }}>
              Create a new Account
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  