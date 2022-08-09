import axios from "axios";
import * as actions from "./reducer";
import { call, put, takeLatest } from "redux-saga/effects";
import { Alert } from "react-native";
import { URL } from "../baseurl";

function* SignUp({ payload }) {
  const { email, fullname, password, phone } = payload.formValues;
  const main = { email, fullname, password, phone };
  try {
    yield put(actions.spinner(true));
    const res = yield call(axios.post, `${URL}/signup`, main);
    if (res.status == 200) {
      Alert.alert(
        "Submit Successfuly",
        "Please Verified Account From Your Email",
        [
          {
            text: "Ok",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          // { text: "Yes", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      yield put(actions.spinner(false));
    }
  } catch (e) {
    console.log(e, "Error create Account");
  }
}

function* Login({ payload }) {
  try {
    const { email, password } = payload.formvalue;
    const data = { email, password };
    yield put(actions.spinner(true));
    const respo = yield call(axios.post, `${URL}/login`, data);
    if (respo.status == 200) {
      if (respo.data == "Invalid Password") {
        Alert.alert("Invalid Password");
        yield put(actions.spinner(false));
      } else if (respo.data == "Email is Incorrect") {
        Alert.alert("Email is Incorrect");
        yield put(actions.spinner(false));
      } else {
        if (respo.data[0].verified) {
          yield put(actions.UserData(respo.data[0]));
          yield put(actions.spinner(false));
        } else {
          Alert.alert("Verified Your Account from Gmail");
          yield put(actions.spinner(false));
        }
      }
    } else {
      Alert.alert("Error");
      yield put(actions.spinner(false));
    }
  } catch (error) {
    Alert.alert("Incorrect", error);
    yield put(actions.spinner(false));
  }
}
function* emailForget({ payload }) {
  const { email } = payload;
  const data = { email };
  try {
    const respo = yield call(axios.post, `${URL}/forgetEmail`, data);
    if (respo.data == "Email has been sent Successfully") {
      Alert.alert("Email has been sent Successfully");
    } else if (respo.data == "Email Not Sent!") {
      Alert.alert("Email Not Sent!");
    }
  } catch (error) {
    Alert.alert("Error");
  }
}

function* resetPassword({ payload }) {
  const { newpassword, confirmpassword, otp } = payload;
  const data = { newpassword, confirmpassword, otp };
  try {
    const respo = yield call(axios.post, `${URL}/resetpassword`, data);
    if (respo.data == "OTP is not Correct") {
      Alert.alert("OTP is not Correct");
    } else if (respo.data == "Password Incorrect") {
      Alert.alert("Password Incorrect");
    } else {
      Alert.alert("Password Changed");
    }
  } catch (error) {
    Alert.alert("Error");
  }
}

function* volunteerForm({ payload }) {
  const { fullname, email, phone, address, message } = payload.formValues;
  const data = { fullname, email, phone, address, message };
  try {
    const response = yield call(axios.post, `${URL}/submitVolunteer`, data);
    if (response.data == "Submit Successfully") {
      Alert.alert("Submit Successfully");
    } else if (response.data == "Not Submit") {
      Alert.alert("Not Submit");
    }
  } catch (err) {
    Alert.alert("Error");
  }
}

function* googleData({ payload }) {
  const { id, name, email, picture } = payload;
  const data = { id, name, email, picture };
  try {
    const response = yield call(axios.post, `${URL}/socialdata`, data);
    if (response.data[0].userexist == true) {
      yield put(actions.UserData(response.data));
    } else if (response.data[0].userexist == null) {
      yield put(actions.UserData(response.data));
      Alert.alert("Login Successfully");
    }
  } catch (err) {
    Alert.alert("Error");
  }
}

function* facebookData({ payload }) {
  try {
    const picture = payload.picture.data.url;
    const { name, email, id } = payload;
    const data = { name, email, id, picture };
    const response = yield call(axios.post, `${URL}/socialdata`, data);
    if (response.data[0].userexist == true) {
      yield put(actions.UserData(response.data));
    } else if (response.data[0].userexist == null) {
      yield put(actions.UserData(response.data));
      Alert.alert("Login Successfully");
    }
  } catch (err) {
    Alert.alert("Error");
  }
}

function* pinTheTrashForm({ payload }) {
  try {
    const { userid, cleantype, description, image, latitude } = payload;
    const main = { userid, cleantype, description, latitude };
    const data = new FormData();
    data.append("image", {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
    data.append("formvalue", JSON.stringify(main));
    const head = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };
    const response = yield call(axios.post, `${URL}/pinthetrash`, data, {
      headers: head,
    });
    console.log(response);
    if (response.data.length != 0 && response.status == 200) {
      Alert.alert("Submit Successfully");
    } else {
      Alert.alert("Not Submit");
    }
  } catch (err) {
    console.log(err);
  }
}

function* pintheTrashVedio({ payload }) {
  try {
    const { userid, cleantype, description, video, latitude, longitude } =
      payload;
    const main = { userid, cleantype, description, latitude, longitude };
    const data = new FormData();
    data.append("video", {
      uri: video.uri,
      name: video.name,
      type: video.type,
    });
    data.append("formValue", JSON.stringify(main));
    const heads = {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };
    const response = yield call(axios.post, `${URL}/pinthetrashvedio`, data, {
      headers: heads,
    });
    if (response.data.length != 0 && response.status == 200) {
      Alert.alert("Submit Successfully");
    } else {
      Alert.alert("Not Submit");
    }
  } catch (err) {
    console.log(err);
  }
}

function* fetchJobstatus({ payload }) {
  try {
    const response = yield call(
      axios.post,
      `${URL}/fetchjobstatus`,
      payload.id
    );
    yield put(actions.JobStatus(response.data));
    console.log("fetch");
  } catch (err) {
    console.log(err);
  }
}

function* deletejob({ payload }) {
  try {
    const response = yield call(axios.patch, `${URL}/deletejob`, payload);
    if (response.status == 200) {
      Alert.alert("Delete Successfully");
    } else if (response.data == "Not Deleted") {
      Alert.alert("Error");
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateProfile({ payload }) {
  try {
    const response = yield call(
      axios.patch,
      `${URL}/updateprofile`,
      payload.formValues
    );
    if (response.data == "Updata Successfully") {
      Alert.alert("Updata Successfully");
    } else if (response.data == "Not Update") {
      Alert.alert("Update Cancelled");
    }
  } catch (err) {
    console.log(err);
  }
}

function* signout() {
  yield put(actions.SignOut([[]]));
}

function* homeSaga() {
  yield takeLatest("SIGNUP", SignUp);
  yield takeLatest("LOGIN", Login);
  yield takeLatest("EMAIL_FOR_FORGET_PASSWORD", emailForget);
  yield takeLatest("FORGET_PASSWORD", resetPassword);
  yield takeLatest("VOLUNTEER_FORM", volunteerForm);
  yield takeLatest("GOOGLE_DATA", googleData);
  yield takeLatest("FACEBOOKDATA", facebookData);
  yield takeLatest("SUBMIT_PIN_THE_TRASH", pinTheTrashForm);
  yield takeLatest("PIN_THE_TRASH_VEDIO", pintheTrashVedio);
  yield takeLatest("FETCH_JOBSTATUS", fetchJobstatus);
  yield takeLatest("DELETE_JOB_STATUS", deletejob);
  yield takeLatest("UPDATE_PROFILE", updateProfile);
  yield takeLatest("SIGN_OUT", signout);
}
export default homeSaga;
