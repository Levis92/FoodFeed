import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';

var MOCK_INGREDIENTS = [
    {name: 'Kaffe', amount: '2 dl'},
    {name: 'Milk', amount:'1 l'}
    ]
class RecipeIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ingredients: MOCK_INGREDIENTS
    };
  }
  render() {
      var ingredient = this.state.ingredients[0];
    return (
      <View style={styles.container}>
        <Text>
            {ingredient.name}
        </Text>
      </View>
      
    );  
  }
}

module.exports = RecipeIngredients;

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
