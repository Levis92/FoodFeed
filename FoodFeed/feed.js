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
import FaIcon from 'react-native-vector-icons/FontAwesome';
var Recipe = require('./Recipe.js')
const BASE_URL = 'https://foodfeed.azurewebsites.net';

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
        console.log(this.state);
    this.fetchData();
  }
  fetchData () {
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          var REQUEST_URL = BASE_URL + "/api/recipe";
          if(this.props.feedType=='favorites'){
            REQUEST_URL+= "/liked";
          } 
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
  likeRecipe (recipe) {
    recipe.HasLiked = true;
    recipe.Likes++;
    this.forceUpdate();
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          var REQUEST_URL = BASE_URL + "/api/recipe/"+recipe.Id+"/like";
          myInit = {
            method:"POST",
            headers:{"Authorization":"bearer "+token}
          }
          fetch(REQUEST_URL,myInit)
            .then((response) => {
            })
            .done();
        } else {
          resolve({loggedIn: false});
        }
      });
  }
  dislikeRecipe (recipe) {
    recipe.HasLiked = false;
    recipe.Likes--;
    this.forceUpdate();
    AsyncStorage.getItem('loginToken')
      .then((token) => {
        if (token) {
          var REQUEST_URL = BASE_URL + "/api/recipe/"+recipe.Id+"/unlike";
          myInit = {
            method:"POST",
            headers:{"Authorization":"bearer "+token}
          }
          fetch(REQUEST_URL,myInit)
            .then((response) => {
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
          <Text style={styles.username}>{recipe.User.Name}</Text>
          <View style={styles.likeBox}>
            <TouchableOpacity onPress={()=>{recipe.HasLiked?this.dislikeRecipe(recipe):this.likeRecipe(recipe)}}>
              <Text style={styles.likeHeart}><Icon name={recipe.HasLiked?'ios-heart':'ios-heart-outline'} color="#12311C" size={25} /></Text>
            </TouchableOpacity>
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
            <Text style={styles.retweet}><FaIcon name="retweet" color="#12311C" size={25} /> </Text>
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