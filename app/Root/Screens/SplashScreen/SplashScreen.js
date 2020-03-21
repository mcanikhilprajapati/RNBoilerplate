import React, {Component} from "react";
import {NavigationActions, StackActions} from "react-navigation";
import {connect} from "react-redux";
import {Image, View} from 'react-native'
import {faceID} from "app/assets";
import styles from "./SplashScreenStyle";
import {SessionManager} from "react-native-gtlcomponent";
import {SesstionKey} from "app/Constants";
import Translater from "app/i18n/SyncTranslate";


class SplashScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        Translater.setConfig("en");

        const isLogin = await SessionManager.getValueForKey(SesstionKey.ISLOGIN);
        if (isLogin === 'true') {
            this.props.navigation.navigate('HomeScreen');
        } else {
            setTimeout(() => {
                this.props.navigation.navigate('RegisterScreen');
            }, 1000)
        }

    }

    render() {
        return (
            <View style={styles.container1}>
                <Image style={styles.imageStyle} source={faceID}/>
            </View>
        );
    }
}

const mapActionCreators = {};
const mapStateToProps = state => {
    return {};
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(SplashScreen);


