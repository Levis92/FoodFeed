import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

var MOCK_RECIPES= [
  {id:'123', title: 'Soppa', creator:{username:"Simon",userid:"1234"}, createdAt: "32 min ago",likeCount:5,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'124', title: 'Sten', creator:{username:"Pär",userid:"1235"}, createdAt: "50 min ago",likeCount:10,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'125', title: 'Sture', creator:{username:"John",userid:"1236"}, createdAt: "3 days ago",likeCount:17,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'https://images.kitchenstories.de/recipeImages/04_25_AmericanApplePie_final.jpg'}},
  {id:'126', title: 'Säng', creator:{username:"Erik",userid:"1237"}, createdAt: new Date(),likeCount:1,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
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
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(MOCK_RECIPES),
        loaded: true,
      });
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
          console.log(this.state.dataSource);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRecipe}
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
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.likeCount}>{recipe.creator.likeCount}</Text>
        </View>
        <Image
          resizeMode="cover"
          source={{uri: recipe.image.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.bottomContainer}>
          <Text style={styles.username}>{recipe.creator.username}</Text>
          <Icon name="ios-american-football" size={30} color="#4F8EF7" />
          <Text style={styles.createdAt}>{recipe.createdAt.toString()}</Text>
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
    paddingRight:5
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color:"#12311C",
  },
  username: {
    textAlign: 'center',
    color:"#12311C",
  },
  thumbnail: {
    flex: 8,
    height:300
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#E8E8E8',
  },
});

module.exports = Feed