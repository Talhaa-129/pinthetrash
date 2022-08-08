import { Formik } from "formik";
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import reducer from "../../store/reducer";
import homeSaga from "../../store/saga";

function Profile() {
  const dispatch = useDispatch();

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const userdata = useSelector((state) => state.global.userdata);
  const data = userdata[0];

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      {data ? (
        <Image
          source={{ uri: data?.picture }}
          resizeMode="cover"
          style={{
            width: "40%",
            height: "20%",
            borderRadius: 100,
            alignSelf: "center",
            borderWidth: 4,
            borderColor: "#FFcc00",
            marginTop: 20,
          }}
        />
      ) : (
        <View
          style={{
            width: "40%",
            height: "20%",
            backgroundColor: "#f36836",
            borderRadius: 100,
            alignSelf: "center",
            marginTop: "5%",
          }}
        >
          <Ionicons
            name="person-add-outline"
            size={80}
            style={{
              textAlign: "center",
              marginTop: "15%",
              marginRight: 10,
              color: "white",
            }}
          />
        </View>
      )}
      <View style={styles.profileRow}>
        <Text style={{ marginHorizontal: 10, marginVertical: 5 }}>Name</Text>
        <View style={styles.profileRowdiv}>
          <Text style={styles.profileText}>{data?.name}</Text>
        </View>
        <Text style={{ marginHorizontal: 10, marginVertical: 5 }}>Email :</Text>
        <View style={styles.profileRowdiv}>
          <Text style={styles.profileText}>{data?.email}</Text>
        </View>
        <Text style={{ marginHorizontal: 10, marginVertical: 5 }}>
          Phone number :
        </Text>
        <View style={styles.profileRowdiv}>
          <Formik
            initialValues={{ phone: "" }}
            onSubmit={(values, formikAction) => {
              const formValues = { ...values, id: data?.userid };
              dispatch({
                type: "UPDATE_PROFILE",
                payload: { formValues },
              });
              formikAction.resetForm();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <TextInput
                  // mode="outlined"
                  label="Phone Number"
                  // disabled={spin == true ? true : false}
                  name="phone"
                  keyboardType="number-pad"
                  placeholder={data?.phone}
                  style={styles.textInput}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                />
                <Button
                  // loading={spin}
                  style={{
                    backgroundColor: "#f26837",
                    marginTop: "6%",
                    borderRadius: 20,
                    width: "40%",
                    alignSelf: "center",
                  }}
                  mode="contained"
                  onPress={handleSubmit}
                >
                  <Text style={{ fontWeight: "bold", color: "white" }}>
                    Update
                  </Text>
                </Button>
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
}
export default Profile;

const styles = StyleSheet.create({
  longContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profileRow: {
    display: "flex",
    flexDirection: "column",
    margin: 20,
    marginTop: "10%",
  },
  textInput: {
    height: 40,
    width: "96%",
    margin: 10,
    backgroundColor: "transparent",
  },
  profileRowdiv: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#FFcc00",
    height: 60,
  },
  profileText: {
    padding: 15,
    color: "gray",
    // fontWeight: "bold",
    fontSize: 17,
  },
});
