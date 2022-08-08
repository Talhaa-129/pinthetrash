import React, { useState } from "react";
import { Formik } from "formik";
import { useInjectSaga } from "redux-injectors";
import { View, Text, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import homeSaga from "../../store/saga";
import { useDispatch } from "react-redux";

function ForgetPassword(params) {
  const dispatch = useDispatch();
  const [fun, setfun] = useState(params.visible);

  useInjectSaga({ key: "global", saga: homeSaga });

  const onsubmit = (values, reset) => {
    const formvalue = { ...values };
    dispatch({ type: "EMAIL_FOR_FORGET_PASSWORD", payload: formvalue });
    reset.resetForm();
    setfun(true);
  };
  const onRestPassword = (values, formikAction) => {
    const formValue = { ...values };
    dispatch({ type: "FORGET_PASSWORD", payload: formValue });
    formikAction.resetForm();
  };

  function SecondPage() {
    return (
      <View style={styles.loginContainer}>
        <Formik
          initialValues={{ newpassword: "", confirmpassword: "", otp: "" }}
          onSubmit={onRestPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                mode="outlined"
                label="New Password"
                autoComplete="off"
                name="newpassword"
                placeholder="New Password"
                style={styles.textInput}
                onChangeText={handleChange("newpassword")}
                onBlur={handleBlur("newpassword")}
                value={values.newpassword}
              />
              <TextInput
                mode="outlined"
                label="Confirm Password"
                autoComplete="off"
                name="confirmpassword"
                placeholder="Confirm Password"
                style={styles.textInput}
                onChangeText={handleChange("confirmpassword")}
                onBlur={handleBlur("confirmpassword")}
                value={values.confirmpassword}
              />
              <TextInput
                mode="outlined"
                label="OTP"
                autoComplete="off"
                keyboardType="numeric"
                maxLength={4}
                name="otp"
                placeholder="Enter OTP"
                style={styles.textInput}
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                value={values.otp}
              />
              <Button
                style={{
                  backgroundColor: "#FFcc00",
                  margin: 20,
                  width: 170,
                  alignSelf: "center",
                }}
                mode="contained"
                onPress={handleSubmit}
                // loading={spin}
              >
                <Text style={{ fontWeight: "bold" }}>Reset Password</Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    );
  }
  function FirstPage() {
    return (
      <View style={styles.loginContainer}>
        <Formik initialValues={{ email: "" }} onSubmit={onsubmit}>
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
              <Button
                style={{
                  backgroundColor: "#FFcc00",
                  margin: 20,
                  width: 100,
                  alignSelf: "center",
                }}
                mode="contained"
                onPress={handleSubmit}
                // loading={spin}
              >
                <Text style={{ fontWeight: "bold" }}>Verify</Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    );
  }

  return <View>{fun ? <SecondPage /> : <FirstPage />}</View>;
}
export default ForgetPassword;

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
