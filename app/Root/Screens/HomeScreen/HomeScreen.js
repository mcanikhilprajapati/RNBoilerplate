import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import DashboardTab from './DashboardTab';
import RewardTab from './Tab2';
import ScanQRTab from './Tab3';

import SettingTab from './Tab4';
import {iconDashboard, iconProfilefooter, iconReward, iconScanner, iconSettings} from 'app/assets'
import {color} from "app/Theme";
import styles from "./HomeScreenStyle";
import cs from 'app/CommonStyle'
const Tab = createBottomTabNavigator

(
    {
        'Dashboard': {
            screen: DashboardTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconDashboard : iconDashboard}
                    />
                )
            }),
        },
        'Tab 2 ': {
            screen: RewardTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconSettings : iconSettings}

                    />
                )
            }),
        },
        'Tab 3': {
            screen: ScanQRTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconSettings : iconSettings}

                    />
                )
            }),

        }
        , 'Tab 4': {
            screen: SettingTab,
            navigationOptions: () => ({
                tabBarIcon: ({tintColor, focused}) => (
                    <Image style={focused ? styles.selectedIcon :styles.unSelectedIcon }
                           source={focused ? iconSettings : iconSettings}

                    />
                )
            }),
        }
    },
    {

        defaultNavigationOptions : ({navigation}) =>{
            return{


                tabBarOptions: {

                    tabBarVisible:true,
                    activeTintColor: color._018CCA,
                    inactiveTintColor: 'gray',
                    showLabel: true,
                    style: {
                        paddingTop: 10,
                        paddingBottom: 5,
                        height: 60
                    },
                    swipeEnabled: true,
                    animationEnabled: true,
                },
            }
        }
,

    }
);

const TabScreen = createStackNavigator({
    HomeScreen: {
        screen: Tab, lazy: false, navigationOptions: {
            header: null, tabBarOnPress: ({navigation, defaultHandler}) => {
                defaultHandler();
            },
        }
    },
});


const MyNavigator = createSwitchNavigator({
    routeNameOne: TabScreen,
});
export default TabScreen;

