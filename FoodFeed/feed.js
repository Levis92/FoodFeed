import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

var MOCK_RECIPES= [
  {id:'123', title: 'Soppa', creator:{username:"Simon",userid:"1234"}, createdAt: new Date(),likeCount:5,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {id:'124', title: 'Sten', creator:{username:"Pär",userid:"1235"}, createdAt: new Date(),likeCount:10,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  {id:'125', title: 'Sture', creator:{username:"John",userid:"1236"}, createdAt: new Date(),likeCount:17,image: {full:'http://i.imgur.com/UePbdph.jpg',thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
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
      <View>
        <Image
          source={{uri: recipe.image.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.username}>{recipe.creator.username}</Text>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  username: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Feed