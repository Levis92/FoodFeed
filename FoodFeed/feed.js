import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
var Recipe = require('./Recipe.js')
const BASE_URL = 'https://foodfeed.azurewebsites.net';

var MOCK_RECIPES= [
  {id:'123', title: 'Soppa', creator:{username:"Simon",userid:"1234"}, createdAt: "32 min ago",likeCount:5,liked:false,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'124', title: 'Sten', creator:{username:"Pär",userid:"1235"}, createdAt: "50 min ago",likeCount:10,liked:true,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'125', title: 'Sture', creator:{username:"John",userid:"1236"}, createdAt: "3 days ago",likeCount:17,liked:false,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'126', title: 'Säng', creator:{username:"Erik",userid:"1237"}, createdAt: new Date(),likeCount:1,liked:false,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData () {
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          var REQUEST_URL = BASE_URL + "/api/recipe"
          myInit = {
            headers:{"Authorization":"bearer "+token}
          }
          fetch(REQUEST_URL,myInit)
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
              });
            })
            .done();
        } else {
          resolve({loggedIn: false});
        }
      });
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(recipe)=>this.renderRecipe(recipe)}
        style={styles.listView}
      />
    );
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
  renderRecipe(recipe) {
    return(
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.username}>Hej</Text>
          <View style={styles.likeBox}>
            <Text style={styles.likeHeart}><Icon name={recipe.HasLiked?'ios-heart':'ios-heart-outline'} color="#12311C" size={25} /></Text>
            <Text style={styles.likeCount}> {recipe.Likes}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>{this.props.navigator.push({title:'Recipe',component:Recipe,passProps:{recipe:recipe.Id}})}}>
          <Image
            resizeMode="cover"
            source={{uri: recipe.ImageUrl}}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>{recipe.Name}</Text>
          <View style={styles.timeBox}>
            <Text style={styles.createdAtLogo}><Icon name="ios-clock-outline" color="#12311C" size={25} /></Text>
            <Text style={styles.createdAt}> {recipe.Created.toString()}</Text>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#b6d7a8',
    marginBottom:10,
    height:360,
    position: 'relative',
    alignItems: 'stretch',
    overflow:'hidden',
    borderBottomWidth:1,
    borderBottomColor:"#989898",
    
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:"space-between",
    paddingLeft:5,
    paddingRight:5
  },
  bottomContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:"space-between",
    paddingLeft:5,
    paddingRight:5,
    overflow:'hidden'
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color:"#12311C",
    fontFamily:"Helvetica Neue"
  },
  username: {
    fontSize: 15,
    textAlign: 'center',
    color:"#12311C",
    fontFamily:"Helvetica Neue"
  },
  thumbnail: {
    flex: 8,
    height:300
  },
  listView: {
    paddingTop: 70,
    backgroundColor: '#E8E8E8',
  },
  timeBox:{
    flexDirection: 'row',
    alignItems:'center',
  },
  likeBox:{
    flexDirection: 'row',
    alignItems:'center'
  },
  likeHeart:{
    lineHeight:28
  },
  createdAt:{
    fontFamily:"Helvetica Neue"
  },
  createdAtLogo:{
    lineHeight:28
  }
});

module.exports = Feed