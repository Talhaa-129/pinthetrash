import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";

function PintForm(latitude, longitude) {
  const dispatch = useDispatch();
  const [cleantype, setcleanType] = useState();
  const [firstbackcolor, setfirstBackcolor] = useState("lightgray");
  const [secondbackcolor, setsecondBackcolor] = useState("lightgray");
  const [thirdbackcolor, setthirdBackcolor] = useState("lightgray");
  const [modalVisible, setmodalVisible] = useState(false);
  const [image, setImage] = useState();
  const [video, setVedio] = useState();
  const data = ["Household", "Recyclables", "Harzadous"];

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const userdata = useSelector((state) => state.global.userdata);
  const user = userdata[0];
  const userid = user?.userid;

  const onCleantype = () => {
    if (cleantype == "Household") {
      setfirstBackcolor("#FFcc00");
      setsecondBackcolor("lightgray");
      setthirdBackcolor("lightgray");
    } else if (cleantype == "Recyclables") {
      setsecondBackcolor("#FFcc00");
      setfirstBackcolor("lightgray");
      setthirdBackcolor("lightgray");
    } else if (cleantype == "Harzadous") {
      setthirdBackcolor("#FFcc00");
      setfirstBackcolor("lightgray");
      setsecondBackcolor("lightgray");
    }
  };

  const CameraPic = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      setImage({ uri: localUri, name: filename, type });
      // setmodalVisible(false);
    }
  };

  const ImagePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      videoMaxDuration: 1200000,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if (result.duration) {
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `video/${match[1]}` : `video`;
        setVedio({ uri: localUri, name: filename, type });
      } else if (result.duration > 1200000) {
        Alert.alert("Vedio to long");
      } else {
        let localUri = result.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        setImage({ uri: localUri, name: filename, type });
      }
      // setmodalVisible(false);
    }
  };

  const Submit = (values, formikAction) => {
    if (video?.name && video?.uri && latitude && longitude) {
      const formvalue = {
        ...values,
        userid,
        cleantype,
        video,
        latitude,
        longitude,
      };
      dispatch({ type: "PIN_THE_TRASH_VEDIO", payload: formvalue });
    } else if (image?.name && image?.uri && latitude && longitude) {
      const formvalue = {
        ...values,
        userid,
        cleantype,
        image,
        latitude,
        longitude,
      };
      dispatch({ type: "SUBMIT_PIN_THE_TRASH", payload: formvalue });
    } else if (!latitude && !longitude) {
      Alert.alert("Set location Where You Want To Clean");
    } else {
      Alert.alert("Upload any Vedio or Photo");
    }
    formikAction.resetForm();
  };
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {data.map((values) => {
          return (
            <View
              style={{
                width: "37%",
                height: 80,
                backgroundColor: "#eff5f5",
                borderRadius: 10,
                margin: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 6,
              }}
            >
              <View>
                {values == "Household" ? (
                  <TouchableOpacity
                    onPress={() => {
                      setcleanType(values);
                      onCleantype();
                    }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        borderColor: firstbackcolor,
                        borderWidth: 2,
                        height: "87%",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        style={{ width: 50, height: 50, marginTop: 5 }}
                        source={require("../../pics/h1.png")}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {values}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
                {values == "Recyclables" ? (
                  <TouchableOpacity
                    onPress={() => {
                      setcleanType(values);
                      onCleantype();
                    }}
                    style={{
                      borderColor: secondbackcolor,
                      borderWidth: 2,
                      height: "89%",
                      marginTop: -19,
                      borderRadius: 10,
                      paddingTop: 17,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ width: 50, height: 50, marginTop: -10 }}
                        source={require("../../pics/r1.png")}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                        }}
                      >
                        {values}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
                {values == "Harzadous" ? (
                  <TouchableOpacity
                    onPress={() => {
                      setcleanType(values);
                      onCleantype();
                    }}
                    style={{
                      borderColor: thirdbackcolor,
                      borderWidth: 2,
                      height: "100%",
                      marginTop: -38,
                      borderRadius: 10,
                      paddingTop: 37,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ width: 50, height: 50, marginTop: -33 }}
                        source={require("../../pics/huz.png")}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                        }}
                      >
                        {values}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
      <View style={{ marginTop: 20 }}>
        <Formik initialValues={{ description: "" }} onSubmit={Submit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                name="description"
                placeholder="Description"
                style={styles.textInput}
                onChangeText={handleChange("description")}
                value={values.description}
              />
              <Button
                style={{
                  backgroundColor: "#FFcc00",
                  margin: 20,
                  height: 50,
                  width: 250,
                  alignSelf: "center",
                  borderRadius: 30,
                  padding: 1,
                }}
                mode="contained"
                onPress={handleSubmit}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Pin the Trash
                </Text>
              </Button>
            </>
          )}
        </Formik>
        <View>
          <Button
            mode="contained"
            style={{
              alignItems: "center",
              width: 70,
              borderRadius: 100,
              position: "absolute",
              backgroundColor: "transparent",
              right: 30,
              bottom: 110,
            }}
            onPress={() => {
              setmodalVisible(true);
            }}
            icon={() => (
              <Ionicons
                name="camera-outline"
                size={30}
                style={{ paddingLeft: 15 }}
                color={"#f26837"}
              />
            )}
          />
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setmodalVisible(false);
          }}
          onDismiss={() => {
            setmodalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {image ? (
                <View style={{ position: "absolute", top: 15 }}>
                  <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Image Selected
                  </Text>
                  <Image
                    source={{ uri: image?.uri }}
                    style={{ width: 200, height: 100 }}
                  />
                </View>
              ) : (
                <View>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: "#FFcc00" }}
                    onPress={CameraPic}
                  >
                    <Text>Allow Camera</Text>
                  </Button>
                  <Button
                    mode="outlined"
                    style={{
                      marginTop: "5%",
                      borderColor: "#FFcc00",
                    }}
                    onPress={ImagePic}
                  >
                    <Text style={{ color: "#FFcc00" }}>Open Gallery</Text>
                  </Button>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
export default PintForm;

const styles = StyleSheet.create({
  textInput: {
    height: 155,
    width: "95%",
    margin: 10,
    paddingLeft: 20,
    paddingBottom: 100,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingLeft: 20,
    paddingRight: 20,
    width: "90%",
    height: "20%",
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
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
