import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useInjectSaga, useInjectReducer } from "redux-injectors";
import homeSaga from "../../store/saga";
import reducer from "../../store/reducer";

function SignForm() {
  const dispatch = useDispatch();
  const [hideInput, sethideInput] = useState(true);

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const spin = useSelector((state) => state.global.spin);

  return (
    <View style={styles.loginContainer}>
      <Text>Sign Up</Text>
      <Formik
        initialValues={{ fullname: "", email: "", phone: "", password: "" }}
        onSubmit={(values, formikAction) => {
          const formValues = { ...values };
          dispatch({ type: "SIGNUP", payload: { formValues } });
          setTimeout(() => {
            formikAction.resetForm();
          }, 5000);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              mode="outlined"
              label="Full Name"
              disabled={spin == true ? true : false}
              name="fullname"
              placeholder="Full name"
              style={styles.textInput}
              onChangeText={handleChange("fullname")}
              onBlur={handleBlur("fullname")}
              value={values.fullname}
            />
            <TextInput
              mode="outlined"
              label="E-mail"
              disabled={spin == true ? true : false}
              name="email"
              placeholder="E-mail"
              style={styles.textInput}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            <TextInput
              mode="outlined"
              label="Phone No"
              name="phone"
              disabled={spin == true ? true : false}
              placeholder="Phone"
              style={styles.textInput}
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            <TextInput
              name="password"
              mode="outlined"
              disabled={spin == true ? true : false}
              label="Password"
              placeholder="Password"
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
              style={styles.textInput}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={hideInput}
            />

            <Button
              loading={spin}
              style={{ backgroundColor: "#FFcc00", margin: 20 }}
              mode="contained"
              onPress={handleSubmit}
            >
              <Text style={{ fontWeight: "bold" }}>Submit</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}
export default SignForm;

const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
  },
});
