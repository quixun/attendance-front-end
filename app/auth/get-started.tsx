import { Link, Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

export default function GetStartedScreen() {
  const { name, email, studentID } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{ headerTransparent: true, headerTitle: "" }}
      ></Stack.Screen>
      <View style={styles.container}>
        <View style={[styles.centerVertical, { gap: 5, marginTop: 30 }]}>
          <Text style={{ fontWeight: "500", fontSize: 12 }}>
            Step Verification Your
            <Text style={styles.progressNumber}> Face</Text>
          </Text>
          <Progress.Bar progress={0.5} width={200} color="#EF6F8B" />
        </View>
        <View style={{ marginTop: 200, position: "relative" }}>
          <View
            style={[
              {
                width: 150,
                height: 150,
                borderRadius: 150,
                backgroundColor: "#EF6F8B",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
              styles.fakeBlurCircle,
            ]}
          >
            <Image
              source={require("../../icons8-face-id-ios-17-outlined/icons8-face-id-100.png")}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: 600 }}>
            Face Verification
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              width: 250,
              color: "#6c6b6b",
            }}
          >
            Your face will be scanned to verify your identity when signing in
          </Text>
        </View>
        <Link href={`/verify/verify?name=${name}&email=${email}&studentID=${studentID}`} asChild>
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={{ textAlign: "center", color: "#fff" }}>
              Verify My Face
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  progressNumber: {
    color: "#EF6F8B",
  },
  centerVertical: {
    flexDirection: "column",
    alignItems: "center",
  },
  circleBoxShadow: {
    shadowColor: "rgba(0, 0, 0, 0.35)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5,
  },
  fakeBlurCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    shadowColor: "#32325D",
    shadowOffset: {
      width: 0,
      height: 50, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 5,
  },
  verifyButton: {
    height: 50,
    width: 300,
    backgroundColor: "#EF6F8B",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -130 }],
  },
});
