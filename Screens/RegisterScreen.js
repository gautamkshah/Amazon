import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
    Alert,
  } from "react-native";
  import { React, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  
  import amazonLogo from "../assets/images/amazon.png";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { Fontisto } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import axios from "axios";
  
  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
  
    const handleRegister = () => {
      const user = {
        name: name,
        email: email,
        password: password,
      };
  
      // send a POST  request to the backend API to register the user
      axios
        .post("http://192.168.1.5:8000/register", user)
        .then((response) => {
          console.log(response);
          Alert.alert(
            "Registration successful",
            "You have been registered Successfully"
          );
          setName("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          Alert.alert(
            "Registration Error",
            "An error occurred while registering"
          );
          console.log("registration failed", error);
        });
    };
  
    
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
          <View style={{ alignItems: "center", marginTop: 0 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginTop: 12,
                alignItems: "center",
                color: "#041E42",
              }}
            >
              Register to your Account
            </Text>
          </View>
  
          <View style={{ marginTop: 30 }}>
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
              <Fontisto
                name="person"
                size={24}
                color="gray"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Enter your Name"
                style={{ fontSize: 20, color: "gray", marginVertical: 10 }}
              />
            </View>
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
            onPress={handleRegister}
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
              Register{" "}
            </Text>
          </Pressable>
  
          <Pressable
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: 20, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, color: "#007FFF", fontWeight: 500 }}>
              Already have an Account? Login
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default RegisterScreen;
  