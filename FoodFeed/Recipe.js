/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';

var MOCK_RECIPE= [
  {id:'123', title: 'Soppa', duration:'35', creator:{username:"Simon",userid:"1234"}, createdAt: new Date(),likeCount:5,image: {full:'http://i.imgur.com/Gze1KMo.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'aboutTab',  
      recipe: MOCK_RECIPE
    };
  }
  render() {
    var recipe = this.state.recipe[0];
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: recipe.image.full}}>
          <View style={styles.backdropView}>
            <Text style={styles.user}>
              @{recipe.creator.username}
            </Text>
            <Text style={styles.heart}>
              Hj
            </Text>
          </View>
        </Image>
        <View style={styles.flowRight}>
          <Text style={styles.tab}>
            about
          </Text>
          <Text style={styles.tab}>
            ingredients
          </Text>
          <Text style={styles.tab}>
            steps
          </Text>
        </View>
        <View style={styles.flowRight}>
          <Text style={styles.recipeName}>
            {recipe.title}
          </Text>
          <Text style={styles.duration}>
            {recipe.duration} min
          </Text>
          
        </View>
      </View>
      
    );  
  }
}

module.exports = Recipe;

const styles = StyleSheet.create({
  tab: {
    flex:1,
    textAlign: "center"
  },
  image: {
    paddingTop: 70,
    width: 375,
    height: 300
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  user: {
    fontSize: 20,
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black',
    flex: 4
  },
  heart: {
    textAlign: 'right',
    flex:1
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  flowRight:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  }, 
  duration: {
    flex: 1
  },
  recipeName: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    flex: 4
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

