/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {AppLoading, Asset, Font} from 'expo';
import LoginScreen from '../login-screen/';
import {Ionicons} from '@expo/vector-icons';
import RootNavigation from '../../navigation/RootNavigation';
import * as actions from './actions';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import ThinkingGreenThoughts from './thinking-green-thoughts';
// import GetEmail from './get-email';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)'
    }
});


class LoadingScreen extends Component {
    static propTypes = {
        isLoadingComplete: PropTypes.bool,
        initialAuthChecked: PropTypes.bool,
        isLoggingInViaSSO: PropTypes.bool,
        actions: PropTypes.object,
        skipLoadingScreen: PropTypes.bool,
        user: PropTypes.object,
        userIsLoggedIn: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
        this._handleLoadingError = this._handleLoadingError.bind(this);
    }

    componentWillMount() {
        this.props.actions.initialize();
    }

    _loadResourcesAsync = async () => Promise.all([
        this.props.actions.initialize(),
        Asset.loadAsync([
            require('../../assets/images/circle-gray.png'),
            require('../../assets/images/circle-blue.png'),
            require('../../assets/images/circle-red.png'),
            require('../../assets/images/circle-yellow.png'),
            require('../../assets/images/circle-green.png'),
            require('../../assets/images/circle-purple.png'),
            require('../../assets/images/broom.png'),
            require('../../assets/images/robot-dev.png'),
            require('../../assets/images/robot-prod.png'),
            require('../../assets/images/google-logo.jpg'),
            require('../../assets/images/facebook-logo.png'),
            require('../../assets/images/green-up-logo.png'),
            require('../../assets/images/covered-bridge2.jpg'),
            require('../../assets/images/teamwork.jpeg')
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free
            // to remove this if you are not using it in your app
            'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf')
        })
    ]);

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        // console.warn(error);
        this.props.actions.loadingCompleted(false, error);
    };

    _handleFinishLoading = () => {
        this.props.actions.loadingCompleted();
    };

    render() {
        switch (true) {
            case (!this.props.isLoadingComplete && !this.props.skipLoadingScreen):
                return (
                    <AppLoading
                        startAsync={this._loadResourcesAsync}
                        onError={this._handleLoadingError}
                        onFinish={this._handleFinishLoading}
                    />
                );
            case (this.props.isLoggingInViaSSO):
                return (
                    <ThinkingGreenThoughts/>
                );
            case (!this.props.initialAuthChecked):
                return (
                    <ThinkingGreenThoughts/>
                );
            case (!this.props.userIsLoggedIn) :
                return (
                    <LoginScreen/>
                );

            default :
                // return !this.props.user.email ? (<GetEmail/>) : (
                //     <View style={styles.container}>
                //         {Platform.OS === 'ios' && <StatusBar barStyle='default'/>}
                //         {Platform.OS === 'android' && <View style={styles.statusBarUnderlay}/>}
                //         <RootNavigation/>
                //     </View>
                return (
                    <View style={[styles.container, {padding: 0, margin: 0}]}>
                        <RootNavigation/>
                    </View>
                );
        }
    }

}

function mapStateToProps(state) {
    return {
        isLoadingComplete: state.loading.isLoadingComplete,
        initialAuthChecked: state.login.initialAuthChecked,
        isLoggingInViaSSO: state.login.isLoggingInViaSSO,
        skipLoadingScreen: state.loading.skipLoadingScreen,
        userIsLoggedIn: state.login.userIsLoggedIn,
        user: state.login.user || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
