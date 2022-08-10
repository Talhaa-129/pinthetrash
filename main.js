import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Start from "./Components/StartPage";
import Sign from "./Components/CreateAccount";
import Homepage from "./Components/Home/homePage";
import Explore from "./Components/Explore/explore";
import CustomDrawerLoginPhoto from "./Components/DrawerContent/CustomDrawer";
import Profile from "./Components/ProfilePage/profile";
import HistoryStatus from "./Components/History/history";
import LoginForm from "./Components/CreateAccount/LoginPage";
import Volunteer from "./Components/Becomevolunteer/Volunteer";
import { Button } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();

function DrawerMain() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerLoginPhoto {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#FFcc00",
        headerRight: () => (
          <Button
            mode="contained"
            style={{
              borderRadius: 100,
              height: 53,
              width: 40,
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              paddingTop: 5,
              marginRight: 10,
              paddingLeft: 10,
            }}
            icon={() => (
              <Ionicons
                name="share-social-outline"
                size={35}
                color={"#FFcc00"}
              />
            )}
          />
        ),
        headerStyle: {
          height: 120,
        },
        headerTransparent: true,
        headerLeftContainerStyle: {
          width: 60,
          marginTop: 20,
          marginLeft: 10,
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: 100,
        },
        headerTitleStyle: { color: "transparent" },
        drawerLabelStyle: { fontSize: 20, fontWeight: "bold" },
        headerTintColor: "#F26837",
      }}
    >
      <Drawer.Screen
        name="Main"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={"#F26837"} />
          ),
        }}
        component={Homepage}
      />

      <Drawer.Screen
        name="Explore"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={22} color={"#F26837"} />
          ),
        }}
        component={Explore}
      />
      <Drawer.Screen
        name="History"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="paper-plane-outline" size={22} color={"#F26837"} />
          ),
        }}
        component={HistoryStatus}
      />
      <Drawer.Screen
        name="Volunteer"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="people-outline" size={22} color={"#F26837"} />
          ),
        }}
        component={Volunteer}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          options={{ title: "", headerShown: false }}
          component={Start}
        />
        <Stack.Screen
          name="Sign"
          options={{
            title: "",
            header: () => undefined,
          }}
          component={Sign}
        />
        <Stack.Screen
          name="Login"
          options={
            {
              // title: "",
              // header: () => undefined,
            }
          }
          component={LoginForm}
        />
        <Stack.Screen
          name="Drawer"
          options={{ title: "", headerShown: false }}
          component={DrawerMain}
        />
        <Stack.Screen
          name="Profile"
          // options={{ title: "" }}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Main;
