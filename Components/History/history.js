import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useInjectReducer, useInjectSaga } from "redux-injectors";
import Ionicons from "react-native-vector-icons/Ionicons";
import reducer from "../../store/reducer";
import homeSaga from "../../store/saga";
import { URL } from "../../baseurl";

function HistoryStatus() {
  const dispatch = useDispatch();
  const [showBox, setShowBox] = useState(true);

  useInjectSaga({ key: "global", saga: homeSaga });
  useInjectReducer({ key: "global", reducer: reducer });

  const userdata = useSelector((state) => state.global.userdata);
  const history = useSelector((state) => state.global.jobstatus);

  const user = userdata[0];
  const userid = user?.userid;
  const id = { userid };

  useEffect(() => {
    dispatch({ type: "FETCH_JOBSTATUS", payload: { id } });
  }, [id]);

  const showConfirmDialog = (id, userid) => {
    return Alert.alert(
      `Are your sure?`,
      "Are you sure you want to remove your job?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch({ type: "DELETE_JOB_STATUS", payload: { id, userid } });

            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {history.length != 0 ? (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {history.map((values) => {
              return (
                <View style={styles.card} key={values.id}>
                  <View>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: `${URL}/images/${values.picture}`,
                      }}
                      style={styles.image}
                    />
                  </View>
                  <View>
                    <Text style={{ color: "orange" }}>
                      {values.trashcategory}
                    </Text>
                    <Text>{values.description}</Text>
                    <Text>{values.date}</Text>
                  </View>
                  <View style={{ position: "relative", bottom: -20 }}>
                    <TouchableOpacity
                      onPress={() => {
                        showConfirmDialog(values.id, values.userid);
                      }}
                    >
                      <Ionicons name="trash-outline" size={24} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{
              alignItems: "center",
              position: "relative",
              top: 410,
            }}
          >
            <Text style={{ fontSize: 20, color: "gray" }}>Empty</Text>
          </View>
        )}
      </View>
    </View>
  );
}
export default HistoryStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  image: {
    height: 85,
    marginBottom: 5,
    width: 90,
    borderRadius: 100,
  },
  scrollView: {
    marginHorizontal: 10,
    marginTop: "30%",
  },
  card: {
    width: "90%",
    alignSelf: "center",
    display: "flex",
    paddingLeft: 0,
    paddingTop: 10,
    justifyContent: "space-around",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 15,
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
  },
});
