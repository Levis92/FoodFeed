/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
  AsyncStorage,
  Image
} from 'react-native';
var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;
var Feed = require('./Feed.js')
var Recipe = require('./Recipe.js')
const BASE_URL = 'https://foodfeed.azurewebsites.net';

class FoodFeed extends Component {
  render() {
      return(
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            component: Main,
            title: 'Welcome!',
            navigationBarHidden:true,
            passProps: { myProp: 'foo' }
          }}
        />
      );
/*    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Food Feed!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>*/
 /*   );*/
  }
}
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { myButtonOpacity: 1 }
  }
  render() {
      var _this = this;
      return(
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            source={require('./logo.png')}
            style={styles.thumbnail}
          />
          <FBLogin style={styles.fbBtn}
            permissions={["email","user_friends"]}
            loginBehavior={FBLoginManager.LoginBehaviors.Native}
            onLogin={(res)=>this.logIn(res.credentials.token)}
            onLogout={function(){
              console.log("Logged out.");
              _this.setState({ user : null });
            }}
            onLoginFound={(res)=>this.logIn(res.credentials.token)}
            onLoginNotFound={function(){
              console.log("No user logged in.");
              _this.setState({ user : null });
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          />
        </View>
        
      );
  }
  logIn(access_token){
    var s = 'grant_type=password&password=test&username=facebookuser:'+access_token;
    var REQUEST_URL = BASE_URL + "/token"
    var myHeaders = {"Content-Type": "text/plain; charset=utf-8"};
    var myInit = { 
      method: "POST",
      headers: myHeaders,
      body:s
    };
    fetch(REQUEST_URL,myInit)
    .then((response) => response.json())
    .then((res) => {
      AsyncStorage.setItem('username', res.userName)
      AsyncStorage.setItem('loginToken', res.access_token);
      AsyncStorage.setItem('loginTokenExpires', res[".expires"].toString());
      this.props.navigator.push({title:'Feed',component:Feed,passProps:{navigator:this.props.navigator,feedType:'feed'}},0)
    })
    .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  thumbnail: {
    width: 380,
    height:250
  },
  fbBtn:{
    flex:2,
    marginTop:50,
    alignSelf:'center'
  }

});

AppRegistry.registerComponent('FoodFeed', () => FoodFeed);
