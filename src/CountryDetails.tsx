
import React, { FC, useCallback, useEffect, useState } from 'react';
import axios from 'axios'
import { ActivityIndicator, SafeAreaView,Text, View ,Image,StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TextInput ,Button} from 'react-native-paper';




interface CountryInfo {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        png: string;
    };
}


const Country = ({route,navigation}:any) => {
    const [countryData, setcountryData] = useState<CountryInfo>();
    const [capitalName, setCapitalName] = useState('');
    const [Error, setError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);

  

    const getCountryData = useCallback(async () => {
        try {
            const response = await axios.get(
                ` https://restcountries.com/v3.1/name/${route.params.name}`
            );
            console.log(response.data)
            setcountryData(response.data[0]);
            console.log(response.data[0].capital[0])
            setCapitalName(response.data[0].capital[0])
           
        } catch (error) {
            console.log(error)
            setError(true);
        }
    }, [route.params.name]);

    useEffect(() => {
        getCountryData();
    }, [getCountryData]);

    
    const handleClick = () => {
      console.log("button clkd")
      navigation.navigate("Weather",{capitalName:capitalName})
       }
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View>
          <Text style={styles.head}>Country Details</Text>
        </View>

        {countryData ? (
          <View style={{ display: "flex" }}>
            <Image source={{ uri: `${countryData.flags.png}` }} style={styles.flagimg}/>
            <Text style={styles.capital}>Capital : {countryData.capital[0]}</Text>
            <Text style={styles.pop}>Country's Population : {countryData.population}</Text>
            <Text style={styles.lat}>Latitude : {countryData.latlng[0]}<Text> deg</Text></Text>
            <Text style={styles.lang}>Longitude : {countryData.latlng[1]}<Text> deg</Text></Text>
          </View>
        ) : (
          <View>
            {Error ? (
              <>
                <View>
                  <Text>Country info not found</Text>
                </View>
              </>
            ) : (
              <View>
                {loading ? (
                  <ActivityIndicator color={"blue"} />
                ) : (
                  <ActivityIndicator color={"blue"} />
                )}
              </View>
            )}
          </View>
        )}
   
        <Button
        style={styles.button}
        mode="contained"
        labelStyle={{ fontSize: 20 ,fontWeight:"900"}}
        onPress={handleClick}
         > Capital weather</Button>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  head: {
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  flagimg: {
    width: 270,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    margin: 35,

  },
  capital: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    margin:15,
    fontWeight:"400",
    marginLeft:30
  },
  pop: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    margin:15,
    fontWeight:"400",
    marginLeft:30,
  },
  lat: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    margin:15,
    marginLeft:30,
    fontWeight:"400"
  },
  lang: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    margin:15,
    marginBottom:40,
    marginLeft:30,
    fontWeight:"400"
  },
  button: {
    // alignItems: "center",
    justifyContent:"center",
    
    width:270,
    height:40,
    fontSize:30,
   backgroundColor:"#6200ee"
  },
});

export default Country;