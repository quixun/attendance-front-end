import Gradient from "@/components/Gradient";
import SubjectCard from "@/components/SubjectCard";
import { env } from "@/env";
import axios from "axios";
import { Stack } from "expo-router";
import * as React from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from 'react-native-toast-message';
import EvilIcons from "react-native-vector-icons/EvilIcons";

export default function HomeScreen() {
  const [keyword, setKeyword] = React.useState("");
  const [subjects, setSubjects] = React.useState("");
  const getSubjects = async () => {
    const res = await axios.get(`${env.REACT_NATIVE_API_URL}/get-subjects`);
    setSubjects(res.data.subjects)
  }

  React.useEffect(() => {
    getSubjects()
  }, [])
  return (
    <>
      <Stack.Screen
        options={{ headerTransparent: true, headerTitle: "" }}
      ></Stack.Screen>
    <View style={styles.container}>
      <Toast />
      <Gradient
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        fromColor={"#EF6F8B"}
        toColor={"#ffffff"}
      >
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 50,
            }}
          >
            <Text style={styles.title}>Home Screen</Text>
            <View>
              <Image
                style={styles.avatar}
                source={require("../icons8-face-id-ios-17-outlined/images.jpg")}
              />
            </View>
          </View>
          <View style={{ position: "relative", marginTop: 30 }}>
            <TextInput
              placeholder="Enter your subject"
              style={[
                styles.search,
              ]}

              onChangeText={(text) => setKeyword(text)}
              value={keyword}
            />
            <EvilIcons
              name="search"
              size={28}
              style={{ position: "absolute", right: 8, top: 7 }}
            />
          </View>
          <FlatList
              data={subjects}
              numColumns={2}
              renderItem={({item}) => <View style={{ marginHorizontal: 5 }}>
                <SubjectCard subject={item}/>
              </View>}
              contentContainerStyle={styles.flatList}
            />
        </View>
      </Gradient>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  search: {
    backgroundColor: "#fff",
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  flatList: {
    alignItems: "center",
    marginTop: 30,
    gap: 10
  }, 
});
