import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import ActivityIndicatorComponent from './01_otherComponent/01_ActivityIndicatorComponent';
import SafeAreaViewComponent from './01_otherComponent/02_SafeAreaView';
import SwitchComponent from './01_otherComponent/03_SwitchComponent';
import FlatListComponent from './01_otherComponent/04_FlatList';

export default function App() {

  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  if(loading){
    return(
      <View style={styles.loadingContainer}>
        <ActivityIndicatorComponent/>
        <View style={{ marginTop:5 }}>
          <Button title='로딩 완료' onPress={() => {setLoading(false)}}/>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaViewComponent isDark={isDark}>
      <StatusBar style='auto'/>
      <SwitchComponent isDark={isDark} setIsDark={setIsDark} />
      <View style={isDark && styles.titleView}>
        <Text>window의 현재 넓이: {Dimensions.get("window").width}</Text>
        <Text>window의 현재 높이 : {Dimensions.get("window").height}</Text>
      </View>
      <View style={styles.rootContainer}>
        <FlatListComponent isDark={isDark}/>
      </View>
      <ModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      <Button title='모달' onPress={()=> setModalVisible(!modalVisible) }/>
    </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  keyContainer:{
    flex:1
  },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  rootContainer:{
    flex:1,
  },
  titleView:{
    backgroundColor:'white',
  }
});