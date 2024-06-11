import axios from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from 'react-native-progress';
let stt = 0;
export default function Verify() {
  const [progress, setProgress] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [isStart, setIsStart] = useState(false);
  const [isTaking, setIsTaking] = useState(false);
  const [isFinally, setIsFinally] = useState(false);
  const [countdown, setCountdown] = useState(-1);
  const [isDone, setIsDone] = useState(false);
  const [predictName, setPredictName] = useState("");
  const cameraRef = useRef(null);
  const { name, email, studentID } = useLocalSearchParams();
  const [photos, setPhotos] = useState<string []>([])
  const [cons, setCons] = useState<boolean >(false)
  useEffect(() => {
    requestPermission;
  }, [])

  if (!permission) {
    return <View />;
  }
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      const base64 = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: "base64",
      }); 
      await attendance(base64)
      setProgress(prevProgress => Math.min(prevProgress + (0.08), 0.8));      
    };
  }

  const attendance = async (base64: string) => {
    try {
      const res = await axios.post(
        "http://192.168.100.215:8000/attendance",
        {
          photo: base64,
        }
      );
      
      if (res.status == 200) {
        setProgress(1);
        console.log(res.data["name"]);
        setIsFinally(true)
        setPredictName(res.data["name"])
      }
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const takePicturePromise = async () => {
    await takePicture();
    console.log('Picture taken');
  };
  
  const startTakingPictures = async () => {
    const totalPictures = 10;
    const picturesPerSecond = 3;
    const intervalTime = 1000 / picturesPerSecond;
    setIsStart(true)
    const picturePromises = [];
    for (let i = 0; i < totalPictures; i++) {
        picturePromises.push(takePicturePromise());
        await new Promise((resolve) => setTimeout(resolve, intervalTime)); 
    }
  
    await Promise.all(picturePromises);
    setIsDone(true); 
  }

  return (
    <>
      <Stack.Screen
        options={{ headerTransparent: true, headerTitle: "" }}
      ></Stack.Screen>
      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing="front">
          {countdown === -1 ? (
            <View>
              <Text>""</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.cameraCounter}>{countdown}</Text>
            </View>
          )}
          <View style={styles.markCamera}></View>
          <View style={styles.background}></View>
          {isStart ? (
            <View style={styles.progressBarWrapper}>
            <Text style={styles.predictName}>Bạn là: <Text style={{ fontSize: 18, color: "#EF6F8B", fontWeight: '600' }}>{predictName}</Text></Text>
            <Progress.Bar
                progress={progress}
                width={200}
                color="#EF6F8B"
            />
        </View>
          ) : (
            <TouchableOpacity
              onPress={startTakingPictures}
              style={styles.startBtn}
            >
              <Text style={{ color: "#fff" }}>Điểm danh</Text>
            </TouchableOpacity>
          )}
                
          <View
            style={{
              position: "absolute",
              zIndex: 10,
              bottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: "#585858", textAlign: "center" }}>
              <Text style={{ color: "#EF6F8B" }}>Chú ý</Text>: Đặt khuôn mặt của
              bạn vào hình elip ở giữa màn hình để việc xác thực chính xác nhất
            </Text>
          </View>
        </CameraView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    position: "relative",
  },
  cameraCounter: {
    position: "absolute",
    fontSize: 300,
    fontWeight: "500",
    top: 150,
    left: 120,
    color: "#EF6F8B",
  },
  startBtn: {
    width: 100,
    height: 50,
    backgroundColor: "#EF6F8B",
    borderRadius: 8,
    position: "absolute",
    bottom: 70,
    left: "50%",
    transform: [{ translateX: -50 }],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  progressNumber: {
    color: "#EF6F8B",
  },
  progressBarWrapper: {
    position: "absolute",
    bottom: 70,
    flexDirection: "column",
    alignItems: "center",
    left: "50%",
    transform: [{ translateX: -100 }],
    gap: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  markCamera: {
    width: 350,
    height: 350,
    borderRadius: 350 / 2,
    backgroundColor: "transparent",
    borderColor: "#EF6F8B",
    borderWidth: 3,
    borderStyle: "dotted",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -175 }, { translateY: -250 }, { scaleY: 1.5 }],
    zIndex: 10,
  },
  background: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 400 / 2,
    bottom: -350,
    backgroundColor: "#fff",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    zIndex: -10,
  },
  captureButton: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "#EF6F8B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
    predictName: {
        textAlign: 'center'
    }
});