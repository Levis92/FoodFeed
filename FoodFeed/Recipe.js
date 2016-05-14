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
  TabBarIOS,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var FBLogin = require('react-native-facebook-login');
var RecipeIngredients = require('./RecipeIngredients.js');
var RecipeAbout = require('./RecipeAbout.js');
var MOCK_RECIPE= [
  {id:'123', description:'En mustig soppa med mycket grönsaker', title: 'Soppa', duration:'35', creator:{username:"Simon",userid:"1234"}, createdAt: new Date(),likeCount:5,image: {full:'http://i.imgur.com/Gze1KMo.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];



class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'aboutTab',
      likeIcon: 'ios-heart-outline',
      innerContent: <RecipeAbout recipe={MOCK_RECIPE[0]} />,  
      recipe: MOCK_RECIPE[0]  
    };
  }
  
  _setLike() {
    if(this.state.likeIcon == 'ios-heart-outline'){
      console.log("it is outline");
      this.state.likeIcon = 'ios-heart';
      this.forceUpdate();
    } else {
      console.log("it is NOT outline");
      this.state.likeIcon = 'ios-heart-outline';
      this.forceUpdate();
    }
  }
  _renderAbout() {
    this.state.innerContent = <RecipeAbout recipe={this.state.recipe} />;
    this.forceUpdate();
  }
    
  _renderIngredients() {
    this.state.innerContent = <RecipeIngredients />;
    this.forceUpdate();  
    console.log("render ingredients");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.recipe.image.full}}>
          <View style={styles.backdropView}>
            <Text style={styles.user}>
              @{this.state.recipe.creator.username}
            </Text>
            <TouchableOpacity onPress={() => this._setLike()}>
              <Text style={styles.likeHeart}>
                <Icon name={this.state.likeIcon} color="#12311C" size={25} />
              </Text>
            </TouchableOpacity>
          </View>
        </Image>
        <View style={styles.flowRight}>
          <TouchableOpacity onPress={() => this._renderAbout()} style={styles.tab}>
            <Text>
              about
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._renderIngredients()} style={styles.tab}>
            <Text style={styles.tab}>
              ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tab}>
              steps
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.innerContent}
      </View>
      
    );  
  }
}

module.exports = Recipe;

const styles = StyleSheet.create({
  tab: {
    flex:1,
    alignSelf:  "stretch"
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

