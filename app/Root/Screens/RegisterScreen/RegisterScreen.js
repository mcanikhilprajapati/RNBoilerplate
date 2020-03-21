import {Image, Platform, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import React, {Component} from "react";
import {Button, Container, Content, Footer, Spinner, Text} from "native-base";
import styles from "./RegisterScreenStyle";
import {EditTextView, TextView} from "app/Component";
import {splashlogo} from "app/assets";

import {forgotPassword, loginUser} from 'app/store/login'
import {color} from "app/Theme";

import Translater from "app/i18n";
import {showToast, ToastType} from "../../../Utils";
import SessionManager from "react-native-gtlcomponent/SessionManager";
import {SesstionKey} from "../../../Constants";


class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            username: '',
            password: '',
            confPassword: '',

        }
    }

    handleForgotPassword = () => {

    };

    componentDidMount() {


    }

    handleLoginSubmit = async () => {
        if (this.state.firstName != '' || this.state.username != '' || this.state.password != '' || this.state.confPassword != '') {
            if (this.state.password != this.state.confPassword) {
                showToast('Password do not match', type = ToastType.DANGER)
            } else {
                await SessionManager.storeKeyValue(SesstionKey.USER, this.state.username);
                await SessionManager.storeKeyValue(SesstionKey.PASSWORD, this.state.password);
                const userProfile = {
                    firstname: this.state.firstName,
                    username: this.state.username
                }
                await SessionManager.storeKeyValue(SesstionKey.USERPROFILE, JSON.stringify(userProfile));
                showToast('User Registered');
                this.props.navigation.navigate("LoginScreen")
            }
        } else {
            showToast('Please fill all details', type = ToastType.DANGER)
        }


    };

    render() {
        return (
            <Container>
                <Content>
                    <Text style={styles.title}>{'Register'}</Text>
                    <View style={{padding: 30, marginTop: 40}}>

                        <EditTextView label={"FIRST NAME"} value={this.state.firstName} onChangeText={(text) => {
                            this.setState({firstName: text})
                        }}/>
                        <EditTextView label={"USERNAME"} value={this.state.username} onChangeText={(text) => {
                            this.setState({username: text})
                        }}/>
                        <EditTextView label={'PASSWORD'} value={this.state.password} secureTextEntry={true}
                                      onChangeText={(text) => {
                                          this.setState({password: text})
                                      }}/>
                        <EditTextView label={'CONFIRM PASSWORD'} value={this.state.confPassword} secureTextEntry={true}
                                      onChangeText={(text) => {
                                          this.setState({confPassword: text})
                                      }}/>
                        <TouchableOpacity onPress={this.handleForgotPassword} style={{alignItems: 'flex-end'}}>
                            <TextView style={styles.rightTextStyle}>{''}</TextView>
                        </TouchableOpacity>
                        {this.props.loading ? <Spinner color={color._018CCA}/> :
                            <Button onPress={this.handleLoginSubmit} full rounded
                                    style={styles.buttonStyle}><TextView
                                style={styles.buttonTextStyle}> {Translater.doTranslate("Registernow")} </TextView></Button>}
                        <Button onPress={() => {
                            this.props.navigation.navigate('LoginScreen');
                        }} full rounded
                                style={styles.regesterbuttonStyle}><TextView
                            style={styles.buttonTextStyle}> {Translater.doTranslate("login")} </TextView></Button>


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
)(RegisterScreen);
