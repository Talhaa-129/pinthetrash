import React from "react";
import { View, Text, ImageBackground, Alert } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";

function CustomDrawerLoginPhoto(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const onSignOut = () => {
    dispatch({ type: "SIGN_OUT" });
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: "blue" }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <ImageBackground
            source={require("../../pics/avatar.png")}
            style={{
              padding: 50,
              height: 70,
              width: 70,
              borderRadius: 40,
              marginLeft: 20,
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="logo-facebook" color={"darkblue"} size={40} />
          <Ionicons
            name="logo-twitter"
            size={40}
            color={"skyblue"}
            style={{ marginLeft: 10 }}
          />
          <Ionicons
            name="logo-instagram"
            color={"purple"}
            size={40}
            style={{ marginLeft: 10 }}
          />
          <Ionicons
            name="logo-youtube"
            size={40}
            color="red"
            style={{ marginLeft: 10 }}
            onPress={() => {
              Alert.alert("Youtube");
            }}
          />
        </View>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} color={"#F26837"} />
            <Text style={{ fontSize: 15, marginLeft: 5, fontWeight: "bold" }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity style={{ paddingVertical: 15 }} onPress={onSignOut}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="log-out-outline" size={22} color={"#F26837"} />
            <Text style={{ fontSize: 20, marginLeft: 5, fontWeight: "bold" }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CustomDrawerLoginPhoto;
