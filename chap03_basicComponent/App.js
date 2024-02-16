import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ViewComponent from './01_basicComponent/01_ViewComponents';
import TextInputComponent from './01_basicComponent/03_TextInputComponent';
import TextComponent from './01_basicComponent/02_TextComponent';
import ImageComponent from './01_basicComponent/04_ImageComponent';
import ScrollViewComponent from './01_basicComponent/05_ScrollViewComponent';

export default function App() {
  const [name, setName] = useState("");

  const onChangeHandler=(name)=>{
    setName(name);
  }

  return (
    <ScrollViewComponent>
   <View style={styles.container}>
    <ViewComponent isTrue={false} styles={styles.viewComponent}/>
    <TextInputComponent onChangeHandler={onChangeHandler} name={name} styles={styles.textInputComponent} />
    <TextComponent name={name} styles={styles.TextComponent} />
    <ImageComponent isTrue={false} styles={styles.imageComponent} />
   </View>
   </ScrollViewComponent>
  );
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex:1
  },
  container: {
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFF99',
    marginTop:20
  },
  viewComponent:{
    alignItems:'center',
    backgroundColor:'yellow',
    marginVertical:2,
    borderWidth:1,
    marginHorizontal:4,
    width:'80%'
  },
  textInputComponent:{
    borderColor:'black',
    borderRadius:3,
    fontSize:15,
    borderWidth:1,
    marginHorizontal:3,
    paddingHorizontal:4,
    width:'80%'
  },
  imageComponent:{
    height:300,
    marginTop:10,
    borderRadius:10,
    width:'80%'
  }
});
