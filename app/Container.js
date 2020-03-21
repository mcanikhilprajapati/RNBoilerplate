import React, {Component} from 'react';
import {connect} from 'react-redux';
import {noInternetConnected} from "app/store/global";
import Navigation from "./Navigation";
import NetInfo, {NetInfoSubscription} from "@react-native-community/netinfo";
import {Loader, NoInternet} from "app/Component";
import {Container} from 'native-base';

class Containers extends Component {
    _subscription: NetInfoSubscription | null = null;

    constructor(props) {
        super(props);
        this.state = {
            isConnected: true
        }
    }

    async componentDidMount() {

        this._subscription = NetInfo.addEventListener(state => {
            this.setState({
                isConnected: state.isConnected
            })
            this.props.noInternetConnected(state.isConnected)
        });

    }

    componentWillUnmount() {

        this._subscription && this._subscription();
    }

    render() {
        return (
            <Container>
                <Navigation/>
                <NoInternet isInternetConnected={!this.props.isInternetConnected} onRetry={() => {
                    alert("onRetry Pressed")
                }}/>
                <Loader loading={this.props.globalLoding}/>
            </Container>
        );
    }
}

const mapActionCreators = {noInternetConnected};

const mapStateToProps = state => {
    return {
        isInternetConnected: state.global.isInternetConnected,
        globalLoding: state.global.loading
    };
};

export default connect(
    mapStateToProps,
    mapActionCreators
)(Containers);
