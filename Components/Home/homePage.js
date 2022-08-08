import React, { useEffect, useState } from "react";
import MapView, { Circle, Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { useInjectSaga, useInjectReducer } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";
import PintForm from "./pintForm";
import { useSelector } from "react-redux";

function Homepage() {
  const navigation = useNavigation();
  const [locations, setLocation] = useState();
  const [latitudes, setLatitude] = useState(113, 32456);
  const [longitudes, setLongitude] = useState(-112.65689);
  const [errorMsg, setErrorMsg] = useState(null);

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });
  let myMap;

  const userdata = useSelector((state) => state.global.userdata);

  if (userdata[0]?.length == 0) {
    navigation.navigate("Sign");
  }

  const onPinIt = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(location);
    })();
  };

  useEffect(() => {
    onPinIt();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={(ref) => (myMap = ref)}
        zoomEnabled={true}
        zoomControlEnabled={true}
        // maxZoomLevel={16}
        followsUserLocation={true}
        initialRegion={{
          latitude: latitudes,
          longitude: longitudes,
          latitudeDelta: longitudes,
          longitudeDelta: longitudes,
        }}
        rotateEnabled={true}
        showsUserLocation={locations ? true : false}
        showsScale={false}
        showsTraffic={false}
        showsCompass={false}
        onPress={() => {
          myMap.fitToCoordinates([
            {
              latitude: latitudes,
              longitude: longitudes,
            },
          ]),
            {
              minZoomLevel: 16,
              // edgePadding: { top: 10, bottom: 10, left: 50, right: 50 },
              animated: true,
            };
        }}
      >
        <Marker
          coordinate={{
            latitude: latitudes,
            longitude: longitudes,
          }}
          focusable={true}
          pinColor="orange"
          // onPress={() => {
          //   myMap.fitToCoordinates([
          //     {
          //       latitude: latitudes,
          //       longitude: longitudes,
          //     },
          //   ]),
          //     {
          // edgePadding: { top: 10, bottom: 10, left: 50, right: 50 },
          //       // animated: true,
          //     };
          // }}
          draggable={true}
          onDragStart={(e) => {
            console.log("drag start", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
          }}
        ></Marker>
        <Circle
          center={{ latitude: latitudes, longitude: longitudes }}
          radius={15}
        ></Circle>
      </MapView>
      <View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <PintForm latitude={latitudes} longitude={longitudes} />
          </View>
        </View>
      </View>
    </View>
  );
}
export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // width: Dimensions.get("window").width,
    height: "50%",
  },
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
    width: "90%",
    height: "50%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
