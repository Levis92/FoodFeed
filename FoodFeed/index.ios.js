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
  TouchableOpacity
} from 'react-native';
var Feed = require('./Feed.js')
var Recipe = require('./Recipe.js')

class FoodFeed extends Component {
  render() {
      return(
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            component: Main,
            title: 'Main',
            passProps: { myProp: 'foo' },
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
      return(
    <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.push({title:'Feed',component:Feed,passProps:{myProp:'foo'}})}
                          onPressOut={() => this.setState({myButtonOpacity: 1})}>
          <View style={[styles.button, {opacity: this.state.myButtonOpacity}]}>
            <Text>Feed</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigator.push({title:'Recipe',component:Recipe,passProps:{myProp:'foo'}})}
                          onPressOut={() => this.setState({myButtonOpacity: 1})}>
          <View style={[styles.button, {opacity: this.state.myButtonOpacity}]}>
            <Text>Recipe</Text>
          </View>
        </TouchableOpacity>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
function goToFeed(){
  console.log("blerf");
}

AppRegistry.registerComponent('FoodFeed', () => FoodFeed);
