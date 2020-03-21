import {TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import React, {Component} from "react";
import {Button, Container, Content, Footer, Spinner, Text} from "native-base";
import styles from "./LoginScreenStyle";
import {EditTextView, TextView} from "app/Component";

import {forgotPassword, loginUser} from 'app/store/login'
import {color} from "app/Theme";

import Translater from "app/i18n";
import {NavigationActions, StackActions} from "react-navigation";
import SessionManager from "react-native-gtlcomponent/SessionManager";
import {SesstionKey} from "../../../Constants";
import {showToast, ToastType} from "../../../Utils";


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    handleLoginSubmit = async () => {
        const myusername = await SessionManager.getValueForKey(SesstionKey.USER);
        const mypassword = await SessionManager.getValueForKey(SesstionKey.PASSWORD);

        if (this.state.username === myusername && this.state.password === mypassword) {

            await SessionManager.storeKeyValue(SesstionKey.ISLOGIN, 'true')

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'HomeScreen'})],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            showToast('Username or Password do not match,please check', type = ToastType.DANGER)
        }


    };

    render() {
        return (
            <Container>
                <Content>
                    <Text style={styles.title}>{'Login'}</Text>
                    <View style={{padding: 30, marginTop: 40}}>

                        <EditTextView label={"USERNAME"} value={this.state.username} onChangeText={(text) => {
                            this.setState({username: text})
                        }}/>
                        <EditTextView label={'PASSWORD'} value={this.state.password} secureTextEntry={true}
                                      onChangeText={(text) => {
                                          this.setState({password: text})
                                      }}/>
                        <TouchableOpacity onPress={this.handleForgotPassword} style={{alignItems: 'flex-end'}}>
                            <TextView style={styles.rightTextStyle}>{'Forgot Password?'}</TextView>
                        </TouchableOpacity>
                        {this.props.loading ? <Spinner color={color._018CCA}/> :
                            <Button onPress={this.handleLoginSubmit} full rounded
                                    style={styles.buttonStyle}><TextView
                                style={styles.buttonTextStyle}> {Translater.doTranslate("login")} </TextView></Button>}
                        <Button onPress={() => {
                            this.props.navigation.navigate('RegisterScreen');
                        }} full rounded
                                style={styles.regesterbuttonStyle}><TextView
                            style={styles.buttonTextStyle}> {Translater.doTranslate("Registernow")} </TextView></Button>
                    </View>

                </Content>
                <Footer style={styles.footerStyle}>
                    <Text style={styles.fontStyle}>{'Copyright ©XYZ Company 2020'}</Text>
                </Footer>
            </Container>

        );
    }
}

const mapActionCreators = {loginUser, forgotPassword};

const mapStateToProps = state => {
    return {
        loading: state.login.loading
    };
};
export default connect(
    mapStateToProps,
    mapActionCreators
)(LoginScreen);
