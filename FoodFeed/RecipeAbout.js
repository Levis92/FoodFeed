import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class RecipeAbout extends Component {
  constructor(props) {
    super(props);
    console.log('pprops', props);
  }
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.flowRight}>
                <Text style={styles.recipeName}>
                    {this.props.recipe.Name}
                </Text>
                <Text style={styles.duration}>
                    <Icon name="ios-clock-outline" /> {this.props.recipe.PrepTime / 60 } min
                </Text>
            </View>
            <Text style={styles.description}>
                {this.props.recipe.Description}
            </Text>
        </View>
      
    );  
  }
}

module.exports = RecipeAbout;

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
    flex: 4
  },
  description: {
      marginTop: 10, 
      textAlign: 'left'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
