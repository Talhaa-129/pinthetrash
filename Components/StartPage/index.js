import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Start() {
  const [hide, sethide] = useState(false);
  const navigation = useNavigation();

  if (hide == false) {
    setTimeout(() => {
      sethide(true);
      // navigation.navigate("Sign");
    }, 4000);
    // sethide(false);
  }

  return (
    <View style={styles.container}>
      {hide ? (
        navigation.navigate("Sign")
      ) : (
        <View style={styles.main}>
          <View style={{ height: 150, paddingTop: 10 }}>
            <Image
              style={{ width: 300, height: 70 }}
              resizeMode="cover"
              source={require("../../pics/nom.png")}
            />
          </View>
          <View>
            <Text
              style={{
                height: 40,
                fontSize: 30,
                fontWeight: "bold",
                color: "#F26837",
              }}
            >
              Welcome To The
            </Text>
          </View>
          <View>
            <Image
              style={styles.bar}
              resizeMode="contain"
              source={require("../../pics/pinthetrash.png")}
            />
          </View>
          <View
            style={{
              paddingVertical: 50,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
                // flexDirection: "row",
              }}
            >
              Non-Profit Organization
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
export default Start;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  main: {
    display: "flex",
    padding: 80,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  bar: {
    width: 200,
    height: 400,
    // backgroundColor: "transparent",
    // opacity: 0.1,
  },
  butt: {
    padding: 60,
    borderRadius: 20,
  },
});
