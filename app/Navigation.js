import React from "react";
import {createAppContainer, createStackNavigator} from "react-navigation";
/*All screen will be added to createStackNavigator*/
import SplashScreen from "./Root/Screens/SplashScreen";
import HomeScreen from "./Root/Screens/HomeScreen";

import LoginScreen from "./Root/Screens/LoginScreen";
import RegisterScreen from "./Root/Screens/RegisterScreen";

/*add all screen above this line*/
import {fromRight} from "././navigationTransitions";


console.disableYellowBox = true;

const StackScreen = createStackNavigator(
    {
        SplashScreen: {
            screen: SplashScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: () => ({
                header: null
            })
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: () => ({
                header: null
            })
        } ,RegisterScreen: {
            screen: RegisterScreen,
            navigationOptions: () => ({
                header: null
            })
        }
    },

    {
        /*
         * fromRight will animate screen from right side while open
         */
        transitionConfig: nav => fromRight()
    }
);

export default createAppContainer(StackScreen);
