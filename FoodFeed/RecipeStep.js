import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class RecipeStep extends Component {
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
        dataSource: this.state.dataSource.cloneWithRows(this.props.steps.Steps)
    });
  }
  render() { 
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(step)=>this.renderStep(step)}
        style={styles.listView}
      />
    ); 
  }
  renderStep(step) {
    return(
      <View style={styles.container}>
        <Text style={styles.instructions}>
            {step.Description}
        </Text>
      </View>
    )
  }
}

module.exports = RecipeStep;

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
backgroundColor: '#b6d7a8'
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
