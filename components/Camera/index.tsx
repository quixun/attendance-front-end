import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Camera } from 'react-native-vision-camera';

const CameraComponent = () => {
    useEffect(() => {
        checkPermission();
    })
    const checkPermission = async () => {
        const newCameraPermission = await Camera.requestCameraPermission()
        const newMicroPhonePermission = await Camera.requestMicrophonePermission()
        console.log(newCameraPermission);
    }
    
    return (
      <View>
        <Text>App</Text>
      </View>
    )
}

export default CameraComponent