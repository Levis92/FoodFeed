import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TabBarIOS
} from 'react-native';

class RecipeIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        
    };
  }
componentDidMount() {
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.ingredients)
    });
  } 
  renderIngredient(ingredient){
    return(
      <View style={styles.container}>   
        <Text style={styles.amount}>
            {ingredient.Amount}
        </Text>
        <Text style={styles.unit}>
            {ingredient.Unit}
        </Text>
        <Text style={styles.instructions}>
            {ingredient.Name}
        </Text>
      </View>
    )
  }
  render() {
      console.log("ingredients", this.props);
      
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(ingredient)=>this.renderIngredient(ingredient)}
        style={styles.listView}
      />
      
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  instructions: {
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    flex:4
  },
  amount: {
      textAlign: 'left',
      fontWeight: 'bold',
      flex: 2
  },
  unit: {
      flex:2,
  }
  
});
