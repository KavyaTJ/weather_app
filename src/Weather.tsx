import axios from 'axios';
import React, { FormEvent, useState,useEffect, FC, useCallback } from 'react';
import { ActivityIndicator, SafeAreaView, View,Text,Image,StyleSheet} from 'react-native';
//weather

// type weatherprop = {
//   route: { params: { capitalName: string; }; }; 
// };

interface WeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

const Weather = ({route}:any) => {
    const [capitalName, setCapitalName] = useState('');
    const [weatherdata, setweatherdata] = useState<WeatherInfo>();
    const [Error, setError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);



    const getWeatherDetails = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(
              `http://api.weatherstack.com/current?access_key=69b97f0f220503edd06c76dc1c677bd4&query=${route.params.capitalName}`
            );
            console.log(response.data)
            setweatherdata(response.data.current);
            setLoading(false);
        } catch (error) {
            setError(true);
        }
    }, [route.params.capitalName]);
    
    
    useEffect(() => {
      getWeatherDetails();
  }, [getWeatherDetails]);
  
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View>
          <Text style={styles.head}>Weather Details</Text>
        </View>

        {weatherdata ? (
          <View>
            <Image source={{ uri: `${weatherdata.weather_icons[0]}` }} style={styles.flagimg} />
            <Text style={styles.temp}>Temperature : {weatherdata.temperature}<Text> &deg;C</Text></Text>
            <Text style={styles.precip}>Precipitation : {weatherdata.precip}<Text> %</Text></Text>
            <Text style={styles.wind}>Wind Speed : {weatherdata.wind_speed}<Text> kmph</Text></Text>
          </View>
        ) : (
          <View>
            {Error ? (
              <>
                <View>
                  <Text>weather info not found</Text>
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
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop:200,

  },
  temp: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    fontWeight:'400',
    marginTop:20
  },
  precip: {
    alignItems: "center",
    fontSize: 22,
    color: "black",

    fontWeight:'400',
    marginTop:20
  },
  wind: {
    alignItems: "center",
    fontSize: 22,
    color: "black",
    fontWeight:'400',
    marginTop:20
  },

});

export default Weather;