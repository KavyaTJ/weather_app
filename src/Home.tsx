
import React, { useState } from "react";
import { View, SafeAreaView ,StyleSheet, TouchableHighlight,Text} from "react-native";
import { useRoute } from "@react-navigation/native";
import { TextInput ,Button} from 'react-native-paper';


function Home({ navigation }: any) {
  const route = useRoute();
  const [name, setName] = useState("");

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TextInput
      style={styles.container}
      label="Enter country "
        mode="outlined"
        theme={{colors:{primary:'gray'}}}
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
    
      <Button
        disabled={name.length == 0}
        style={styles.button}
        mode="contained"
        labelStyle={{ fontSize: 22 ,fontWeight:"900"}}
        onPress={() => {
          navigation.navigate("Country",{name:name}); 
        }}
         > Submit</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

    height:50,
    width:250,
    borderColor:'blue',
    marginBottom:40,
  
  },
  button: {
    width:110,
    height:40,
    fontSize:30,
  },
});

export default Home;