import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function MainScreen() {
  const [focusState, setFocusState] = useState({
    name: false,
    email: false,
    studentID: false,
  });

  const [name, setName] = useState("")
  const [studentID, setStudentID] = useState("")
  const [email, setEmail] = useState("")

  const handleFocus = (field: string) => {
    setFocusState({ ...focusState, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusState({ ...focusState, [field]: false });
  };

  const handleChangeText = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value)
        break;
      case "email":
        setEmail(value)
        break;
      case "studentID":
        setStudentID(value)
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 150, position: 'relative' }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Registration</Text>
        <View style={{ width: 26, height: 3, backgroundColor: '#EF6F8B', position: 'absolute', bottom: 1, left: 2 }}></View>
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your name"
          style={[
            styles.inputRegistration,
            { borderColor: focusState.name ? "#EF6F8B" : "#b9b2b3" },
          ]}
          onFocus={() => handleFocus("name")}
          onBlur={() => handleBlur("name")}
          onChangeText={(text) => handleChangeText("name", text)}
          value={name}
        />
        <TextInput
          placeholder="Enter your email"
          style={[
            styles.inputRegistration,
            { borderColor: focusState.email ? "#EF6F8B" : "#b9b2b3" },
          ]}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          onChangeText={(text) => handleChangeText("email", text)}
          value={email}
        />
        <TextInput
          placeholder="Enter your studentID"
          style={[
            styles.inputRegistration,
            { borderColor: focusState.studentID ? "#EF6F8B" : "#b9b2b3" },
          ]}
          onFocus={() => handleFocus("studentID")}
          onBlur={() => handleBlur("studentID")}
          onChangeText={(text) => handleChangeText("studentID", text)}
          value={studentID}
        />
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 40 }}>
        <Link href={`/auth/get-started?name=${name}&email=${email}&studentID=${studentID}`} asChild>
          <TouchableOpacity style={{ height: 50, width: 300, backgroundColor: '#EF6F8B', flexDirection: 'column', justifyContent: 'center', borderRadius: 100 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>Continue</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <View style={{ width: 50, height: 1, backgroundColor: '#EF6F8B' }}></View>
          <Text style={{ color: '#EF6F8B' }}> Or </Text>
          <View style={{ width: 50, height: 1, backgroundColor: '#EF6F8B' }}></View>
        </View>
        <Link href={`/verify/verify?name=${name}&email=${email}&studentID=${studentID}`} asChild>
          <TouchableOpacity style={{ height: 50, width: 300, backgroundColor: '#EF6F8B', flexDirection: 'column', justifyContent: 'center', borderRadius: 100 }}>
            <Text style={{ textAlign: 'center', color: '#fff' }}>Attendance now</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputRegistration: {
    borderColor: "#b9b2b3",
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 300,
    color: "#6f6869",
  },
  inputWrapper: {
    flexDirection: "column",
    gap: 30,
    marginTop: 50,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
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
    shadowColor: "rgba(0, 0, 0, 0.35)", // Màu của bóng đổ
    shadowOffset: {
      width: 0, // Độ dời theo chiều ngang (X)
      height: 5, // Độ dời theo chiều dọc (Y)
    },
    shadowOpacity: 0.35, // Độ mờ của bóng đổ
    shadowRadius: 15, // Bán kính làm mờ của bóng đổ
    elevation: 5,
  },
  fakeBlurCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    shadowColor: "#32325D", // Chuyển đổi giá trị rgba thành hex hoặc string màu (ví dụ: "#32325D" là giá trị hex tương đương của rgba(50, 50, 93, 0.25))
    shadowOffset: {
      width: 0,
      height: 50, // Sử dụng height (chiều cao) thay vì y để xác định offset theo chiều dọc
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 5, // Elevation trên Android để đảm bảo đổ bóng hoạt động (có thể tùy chỉnh giá trị)
  },
});
