import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [focusState, setFocusState] = useState({
    name: false,
    email: false,
    studentID: false,
    password: false,
  });

  const [name, setName] = useState("");
  const [studentID, setStudentID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFocus = (field: string) => {
    setFocusState({ ...focusState, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusState({ ...focusState, [field]: false });
  };

  const handleChangeText = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "studentID":
        setStudentID(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30, position: "relative" }}>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          Attendance System
        </Text>
        <View
          style={{
            width: 26,
            height: 3,
            backgroundColor: "#EF6F8B",
            position: "absolute",
            bottom: 1,
            left: 2,
          }}
        ></View>
      </View>
      <View
        style={{
          width: 300,
          height: 300,
          borderRadius: 300,
          marginTop: 150,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image style={styles.background} source={require("../bg.png")} />
      </View>
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, textAlign: "center", color: "#4d4d4d" }}>
          "Welcome to the{" "}
          <Text style={{ color: "#EF6F8B", fontWeight: "600", fontSize: 18 }}>
            Attendance System
          </Text>
          ! Start by filling in your information to easily and efficiently
          manage attendance."
        </Text>
      </View>
      <Link
        href={`/register`}
        asChild
        style={{ marginTop: 100 }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            width: 300,
            backgroundColor: "#EF6F8B",
            flexDirection: "column",
            justifyContent: "center",
            borderRadius: 100,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </Link>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          marginTop: 25
        }}
      >
        <Text>Existing user?</Text>
        <Link
          href={`/home`}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ textAlign: "center", color: "#EF6F8B", fontWeight: '500' }}>Attendance now</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  background: {
    width: 400,
    height: 400,
    borderRadius: 400,
  },
});
