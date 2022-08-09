import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { Button, Modal } from "react-native-paper";
import SignForm from "./SignupForm";
import { useNavigation } from "@react-navigation/native";
import LoginForm from "./LoginPage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-facebook";
import ForgetPassword from "./forgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";

WebBrowser.maybeCompleteAuthSession();

function Sign() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hide, sethide] = useState(false);
  const [loginhide, setloginhide] = useState(false);
  const [forgethide, setforgethide] = useState(false);
  const [userFun, setFunInfo] = useState(true);

  // google
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  // facebook

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const userdata = useSelector((state) => state.global.userdata);

  useEffect(() => {
    goHome();
  }, [userdata]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "882701916866-q29e63uau8fpqldes6c6hh4je69o445t.apps.googleusercontent.com",
    expoClientId:
      "882701916866-vtshvna2msohtdst5d3m12u4l5ju87v8.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  if (accessToken) {
    if (userFun) {
      getUserData();
      setFunInfo(false);
    }
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backPressed);
  });

  const backPressed = () => {
    Alert.alert(
      "Exit App",
      "Do you want to exit?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  async function getUserData() {
    try {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      userInfoResponse.json().then((data) => {
        setUserInfo(data);
        dispatch({ type: "GOOGLE_DATA", payload: data });
      });
    } catch ({ message }) {
      alert(`Google Login Error: ${message}`);
    }
  }

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: "733812954400266",
        appName: "PIN THE TRASH",
      });
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            dispatch({ type: "FACEBOOKDATA", payload: data });
          })
          .catch((e) => console.log(e));
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const goHome = () => {
    if (userdata.length != 0 && userdata?.picture) {
      navigation.navigate("Main");
    }
  };

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  };
  const showModal = () => {
    sethide(true);
  };
  const hideModal = () => {
    sethide(false);
  };
  const loginshowModal = () => {
    setloginhide(true);
  };
  const loginhideModal = () => {
    setloginhide(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainDiv}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 300, height: 70 }}
            resizeMode="cover"
            source={require("../../pics/nom.png")}
          />
        </View>
        <View style={{ alignItems: "center", paddingTop: 40 }}>
          <Image
            style={styles.bar}
            resizeMode="contain"
            source={require("../../pics/pinthetrash.png")}
          />
        </View>
        <View
          style={{
            marginHorizontal: 5,
            marginVertical: "5%",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              width: "60%",
              borderRadius: 25,
              backgroundColor: "#FFcc00",
            }}
            mode="contained"
            onPress={loginshowModal}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Login</Text>
          </Button>
        </View>

        <View style={{ alignItems: "center", marginHorizontal: 5 }}>
          <Button
            style={{
              width: "60%",
              borderRadius: 25,
              backgroundColor: "#FFcc00",
            }}
            mode="contained"
            onPress={showModal}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Signup</Text>
          </Button>
        </View>

        <View style={styles.footer}>
          <View style={{ marginLeft: 100 }}>
            <TouchableOpacity
              onPress={
                accessToken
                  ? getUserData
                  : () => {
                      promptAsync({ showInRecents: true });
                    }
              }
            >
              <Image
                style={{ width: 50 }}
                resizeMode="contain"
                source={require("../../pics/goo.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 100 }}>
            <TouchableOpacity onPress={logIn}>
              <Image
                style={{ width: 55 }}
                resizeMode="contain"
                source={require("../../pics/facebook.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.foot}>
          <Text style={styles.footText}>Pin The Trash</Text>
          <Text style={styles.footText2}>PUBLIC LANDS TRASH LOCATOR</Text>
          <Text style={styles.footText3}>Non Profit Organization</Text>
        </View>
      </View>
      <Modal
        visible={hide}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <SignForm />
      </Modal>
      <Modal
        visible={loginhide}
        onDismiss={loginhideModal}
        contentContainerStyle={containerStyle}
      >
        <LoginForm />
        <Button
          style={{ position: "absolute", right: 0, bottom: 20 }}
          onPress={() => {
            setloginhide(false);
            setforgethide(true);
          }}
        >
          <Text style={{ fontSize: 10, color: "#F26837" }}>
            Forget Password
          </Text>
        </Button>
      </Modal>
      <Modal
        visible={forgethide}
        onDismiss={() => {
          setforgethide(false);
        }}
        contentContainerStyle={containerStyle}
      >
        <ForgetPassword visible={forgethide == false ? false : false} />
      </Modal>
    </View>
  );
}
export default Sign;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  mainDiv: {
    display: "flex",
    paddingTop: "25%",
    flexDirection: "column",
    justifyContent: "center",
  },
  bar: {
    width: 170,
    height: 200,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    minHeight: 80,
    marginVertical: "3%",
    width: "auto",
  },
  foot: {
    width: "auto",
    alignItems: "center",
    paddingBottom: "20%",
  },
  footText: {
    fontSize: 30,
    color: "#F26837",
    fontWeight: "bold",
  },
  footText2: {
    fontSize: 15,
  },
  footText3: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#F26837",
  },
});
