import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var MOCK_RECIPES= [
  {id:'123', title: 'Soppa', creator:{username:"Simon",userid:"1234"}, createdAt: new Date(),likeCount:5,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {id:'124', title: 'Sten', creator:{username:"Pär",userid:"1235"}, createdAt: new Date(),likeCount:10,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {id:'125', title: 'Sture', creator:{username:"John",userid:"1236"}, createdAt: new Date(),likeCount:17,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {id:'126', title: 'Säng', creator:{username:"Erik",userid:"1237"}, createdAt: new Date(),likeCount:1,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class FoodFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: MOCK_RECIPES,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if (!this.state.recipes) {
      return this.renderLoadingView();
    }
    return this.renderRecipes();
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading recipes...
        </Text>
      </View>
    );
  }
  renderRecipes() {
    var recipe = this.state.recipes[0];
    return (
      <View style={styles.container}>
        <Image
          source={{uri: recipe.image.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.username}>{recipe.creator.username}</Text>
        </View>
      </View>
    );
  }
  fetchData () {
  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  rightContainer: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center',
    },
    year: {
      textAlign: 'center',
    },
});

module.exports = FoodFeed