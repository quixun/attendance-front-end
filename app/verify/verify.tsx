// import { v2 as cloudinary } from 'cloudinary';
import axios from 'axios';
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from 'expo-file-system';
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

export default function Verify() {
  const [progress, setProgress] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isStartCount, setIsStartCount] = useState(true);
  const [countdown, setCountdown] = useState(-1);
  const [photoCount, setPhotoCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const cameraRef = useRef(null);   
  const { name, email, studentID } = useLocalSearchParams();
  
  useEffect(() => {
    console.log("name:::", name);
    console.log("email:::", email);
    console.log("studentID:::", studentID);
    
    requestPermission;
  }, []);

  if (!permission) {
    return <View />;
  }
  const takePicture = async () => {
    
    if (cameraRef.current) {
      
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoCount(prevCount => prevCount + 1);
      setPhotoTaken(true);

      try {
        const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' }); // Đọc ảnh dưới dạng base64
        uploadImageOnCloud(photo.uri)
        // uploadImageOnCloud(`data:image/jpeg;base64,${base64}`)
        console.log('Upload thành công!');
      } catch (error) {
        console.error('Lỗi upload:', error);
      }      
    }

  };

  const uploadImageOnCloud = async (file: string) => {
    const folderName = `${studentID}_${name}`;
    console.log("file: ", file);
    const formData = new FormData();
    formData.append("image", file)
    formData.append("folder", folderName)

    const res = await axios.get("http://localhost:8000/upload")
    console.log("res: ", file);
    // xhr.open('POST', 'https://api.cloudinary.com/v1_1/dvaegokfq/image/upload');
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://api.cloudinary.com/v1_1/dvaegokfq/image/upload');

  
    // xhr.onload = () => {
    //   if (xhr.status === 200) {
    //     console.log('Upload thành công!');
    //     setProgress((prevProgress) => {
    //       const newProgress = (prevProgress + 1);        
    //       return newProgress;
    //     });
    //     console.log('progress:::', progress);
        
        
    //   } else {
    //     console.error('Lỗi upload:', xhr.statusText);
    //   }
    // };
  
    // const data = new FormData();
    // data.append('file', file);
    // data.append("upload_preset", "snvlqaav");
    // data.append('cloud_name', 'dvaegokfq');
    // data.append('folder', folderName);
  
    // xhr.send(data);
  }

  const startTakingPictures = () => {
    let count = 1
    while(count <= 100) {
      takePicture();
      count++;
    }
  };

  const startCountdown = () => {
    setIsStartCount(true); 
    setIsStart(true); 
    setCountdown(3);
  
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        console.log("prevCountdown:::", prevCountdown)
        if (prevCountdown <= 1) {
          console.log("prevCountdown <= 1:::", prevCountdown <= 1)
          clearInterval(countdownInterval);
          // setCountdown(-1); // Ẩn bộ đếm khi kết thúc
          setIsStartCount(false);
          startTakingPictures()
          return -1; // Reset countdown về 0
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
   <>
   <Stack.Screen
        options={{ headerTransparent: true, headerTitle: "" }}
      ></Stack.Screen>
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        {
          (countdown === -1) ? <View><Text>""</Text></View> : (
            <View>
              <Text style={styles.cameraCounter}>{countdown}</Text>
            </View>
          )
        }
        <View style={styles.markCamera}></View>
        <View style={styles.background}></View>
        {
          isStart ? (
            <View style={styles.progressBarWrapper}>
              <Text style={{ fontWeight: "500", fontSize: 12 }}>
                Verify Progress
                <Text style={styles.progressNumber}> {progress}%</Text>
              </Text>
              <Progress.Bar progress={progress / 100} width={200} color="#EF6F8B" />
            </View>
          ) : (
            <TouchableOpacity onPress={() => {startCountdown()}} style={styles.startBtn}>
              <Text style={{ color: '#fff', }}>Bắt đầu</Text>
            </TouchableOpacity>
          )
        }
        <View style={{ position: "absolute", zIndex: 10, bottom: 10, paddingHorizontal: 20 }}>
          <Text style={{ color: "#585858", textAlign: 'center' }}><Text style={{ color: "#EF6F8B" }}>Chú ý</Text>: Đặt khuôn mặt của bạn vào hình elip ở giữa màn hình để việc xác thực chính xác nhất</Text>
        </View>
      </CameraView>
{/*        
      {!photoTaken && (
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        )} */}
    </View></>
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
    position: 'absolute',
    fontSize: 300,
    fontWeight: '500',
    top: 150,
    left: 120,
    color: '#EF6F8B'
  },
  startBtn: {
    width: 100,
    height: 50,
    backgroundColor: '#EF6F8B',
    borderRadius: 8,
    position: 'absolute',
    bottom: 70,
    left: '50%',
    transform: [{translateX: -50}],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
    gap: 10
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
    zIndex: 10
  },
  background: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 400 / 2,
    bottom: -350,
    backgroundColor: "#fff",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    zIndex: -10
  },
  captureButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: '#EF6F8B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
});
