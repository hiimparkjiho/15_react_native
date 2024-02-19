import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Button, Platform, StyleSheet, TouchableOpacity, View } from "react-native";

const CameraView = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);   // 카메라 상태관리? 후면카메라인지 정면 카메라인지
    const [cameraRef, setCameraRef] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    },[])   //사용자의 갤러리에 접근 권한?

    const handleTakePicture = async () =>{
        if(!cameraRef) return;

        try{
            const photo = await cameraRef.takePictureAsync();
            setCapturedImage(photo);

            if(Platform.OS === "ios"){
                await MediaLibrary.saveToLibraryAsync(photo.uri);
            }else{
                const {status} = await MediaLibrary.requestPermissionsAsync();
                if(status === "granted"){
                    await MediaLibrary.saveToLibraryAsync(photo.uri);
                }
            }
            setCheck(true);
        }catch(error){
            console.log("Failed To Take picture : ", error);
            setCheck(false);
        }
    };

    const handleToggleCameraType = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)

        if(hasPermission === null){
            return (
                <View style={styles.permissionDeniedContainer}>
                    <Text style={styles.permissionDeniedText}>권한이 승인되지 않았습니다.</Text>
                </View>
            );
        }        
    }

    const CameraView = () => {

    }
    const handleCheck =() => {
        setCheck(!check);
    

    if(check){
        return (
            <View style={styles.checkContainer}>
                <Image source={{uri:capturedImage.uri}} style={styles.capturedImage}/>
                <View style={styles.buttonBox}>
                    <Button onPress={handleCheck} title="확인" />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={(ref) => setCameraRef(ref)}
            >
                <View>
                    <TouchableOpacity style={styles.button} onPress={handleToggleCameraType}>
                        <Text style={styles.buttonText}>flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                        <Text style={styles.buttonText}>사진촬영</Text>
                    </TouchableOpacity>
                </View>

            </Camera>
        </View>
    )

    }
}

export default CameraView;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    capturedImage: {
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 20,
    },
    permissionDeniedContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionDeniedText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red",
    },
    checkContainer:{
        flex:1,   
    },
    buttonBox:{
        justifyContent:'center',
        alignContent:'center'
    }
});