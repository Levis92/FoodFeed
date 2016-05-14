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
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var FBLogin = require('react-native-facebook-login');
var RecipeIngredients = require('./RecipeIngredients.js');
var RecipeAbout = require('./RecipeAbout.js');
var RecipeStep = require('./RecipeStep.js');
const BASE_URL = 'https://foodfeed.azurewebsites.net';
var MOCK_RECIPE= [
  {id:'123', description:'En mustig soppa med mycket grönsaker', title: 'Soppa', duration:'35', creator:{username:"Simon",userid:"1234"}, createdAt: new Date(),likeCount:5,image: {full:'http://i.imgur.com/Gze1KMo.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
];



class Recipe extends Component {
  constructor(props) {
    super(props);
    console.log("props in recipe", props);
    this.state = {
      selectedTab: 'aboutTab',
      likeIcon: 'ios-heart-outline',
      recipe:null
    };
    this.fetchRecipe(props.recipe).then(
      (recipe)=>{
        this.setState({
          innerContent: <RecipeAbout recipe={recipe} />,  
          recipe: recipe 
        });
        this.forceUpdate();
      }
    )
  }
  fetchRecipe (recipeId) {
    var p = new Promise((reso,rej)=>{
      AsyncStorage.getItem('loginToken')
        .then((token) => {
          if (token) {
            var REQUEST_URL = BASE_URL + "/api/recipe/"+recipeId;
            myInit = {
              headers:{"Authorization":"bearer "+token}
            }
            fetch(REQUEST_URL,myInit)
              .then((response) => response.json())
              .then((responseData) => {
                console.log(responseData);
                reso(responseData);
              })
              .done();
          } else {
            resolve({loggedIn: false});
          }
        });
    });
    return p;
  }
  _setLike() {
    if(this.state.likeIcon == 'ios-heart-outline'){
      this.state.likeIcon = 'ios-heart';
      this.forceUpdate();
    } else {
      this.state.likeIcon = 'ios-heart-outline';
      this.forceUpdate();
    }
  }
  _renderAbout() {
    this.state.innerContent = <RecipeAbout recipe={this.state.recipe} />;
    this.forceUpdate();
  }
    
  _renderIngredients() {
    this.state.innerContent = <RecipeIngredients ingredients={this.state.recipe.Ingredients} />;
    this.forceUpdate();  
  }
  _renderStep() {
    this.state.innerContent = <RecipeStep steps={this.state.recipe} />
    this.forceUpdate();
    
  } 
  render() {
    if(!this.state.recipe){
          console.log('res is null: ',this.state);
      return (<View><Text>Loading.</Text></View>)
    }
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.state.recipe.ImageUrl}}>
          <View style={styles.backdropView}>
            <Text style={styles.user}>
              {this.state.recipe.User.Name}
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
            <Text style={styles.tab}>
              About
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._renderIngredients()} style={styles.tab}>
            <Text style={styles.tab}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._renderStep()} style={styles.tab}>
            <Text style={styles.tab}>
              Steps
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
    height: 30,
    fontSize: 20,
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
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
  }
});

