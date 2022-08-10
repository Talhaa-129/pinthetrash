import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

function LoginForm() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [hideInput, sethideInput] = useState(true);

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const userdata = useSelector((state) => state.global.userdata);
  const spin = useSelector((state) => state.global.spin);

  const onsubmit = (values, formikAction) => {
    const formvalue = { ...values };
    dispatch({ type: "LOGIN", payload: { formvalue } });
    formikAction.resetForm();
  };

  useEffect(() => {
    GoHomePage();
  }, [userdata]);

  const GoHomePage = () => {
    if (userdata?.verified) {
      navigation.navigate("Drawer");
    } else if (userdata?.length == 0) {
      navigation.navigate("Sign");
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Login Up
      </Text>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={onsubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              mode="outlined"
              label="E-mail"
              autoComplete="off"
              name="email"
              placeholder="E-mail"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              mode="outlined"
              label="Password"
              right={
                <TextInput.Icon
                  name="eye"
                  onPress={() => {
                    if (hideInput == false) {
                      sethideInput(true);
                    } else {
                      sethideInput(false);
                    }
                  }}
                />
              }
              autoComplete="off"
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={hideInput}
            />
            <Button
              style={{
                backgroundColor: "#FFcc00",
                margin: 20,
                width: 100,
                alignSelf: "center",
              }}
              mode="contained"
              onPress={handleSubmit}
              loading={spin}
            >
              <Text style={{ fontWeight: "bold" }}>Submit</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}
export default LoginForm;

const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    alignItems: "center",
    // backgroundColor: "white",
    padding: 10,
    // elevation: 20,
    // backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    // paddingLeft: 20,
    // backgroundColor: "white",
    // borderColor: "gray",
    // borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 10,
  },
});
