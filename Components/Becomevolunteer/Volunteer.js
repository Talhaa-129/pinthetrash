import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { View, Text, StyleSheet, TextInput } from "react-native";

function Volunteer() {
  const dispatch = useDispatch();
  const onSubmitForm = (values, formikAction) => {
    const formValues = { ...values };
    dispatch({ type: "VOLUNTEER_FORM", payload: { formValues } });
    formikAction.resetForm();
  };

  return (
    <View style={{ marginTop: "30%" }}>
      <View style={{ backgroundColor: "#F26837", alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
          Volunteer
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
          Take A Step To Keep Our Planet Clean
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
          To Be A Part Of Nomadic Management Please Fill the Form
        </Text>
      </View>

      <View style={{ marginTop: "10%" }}>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            phone: "",
            address: "",
            message: "",
          }}
          onSubmit={onSubmitForm}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                // disabled={spin == true ? true : false}
                name="fullname"
                placeholder="Full name"
                placeholderTextColor="orange"
                style={styles.textInput}
                onChangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                value={values.fullname}
              />
              <TextInput
                // disabled={spin == true ? true : false}
                name="email"
                placeholderTextColor="orange"
                placeholder="E-mail"
                style={styles.textInput}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <TextInput
                name="phone"
                placeholderTextColor="orange"
                // disabled={spin == true ? true : false}
                placeholder="Phone"
                keyboardType="numeric"
                style={styles.textInput}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              <TextInput
                name="address"
                // disabled={spin == true ? true : false}
                placeholderTextColor="orange"
                placeholder="Address"
                style={styles.textInput}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
              />
              <TextInput
                // disabled={spin == true ? true : false}
                name="message"
                placeholderTextColor="orange"
                placeholder="Message"
                style={styles.textInputMessage}
                onChangeText={handleChange("message")}
                onBlur={handleBlur("message")}
                value={values.message}
              />

              <Button
                // loading={spin}
                style={styles.button}
                mode="contained"
                onPress={handleSubmit}
              >
                <Text style={{ fontWeight: "bold" }}>Submit</Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}
export default Volunteer;

const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    height: 40,
    width: "90%",
    margin: 15,
    borderRadius: 20,
    borderColor: "lightgray",
    paddingLeft: 20,
    borderWidth: 1,
  },
  button: {
    backgroundColor: "orange",
    margin: 20,
    borderRadius: 20,
    width: "50%",
    alignSelf: "center",
  },
  textInputMessage: {
    height: 130,
    width: "90%",
    margin: 15,
    borderRadius: 20,
    borderColor: "lightgray",
    paddingLeft: 10,
    paddingBottom: 70,
    borderWidth: 1,
  },
});
