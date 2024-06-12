import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{ headerTransparent: true, headerTitle: "" }}
      ></Stack.Screen>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
