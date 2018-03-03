import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';


class MyMovies extends React.Component<ScreenProps<>> {

  // this.props.navigator.push({
  //   screen: 'project.MyMovies',
  //   title: 'Pushed Screen'
  // });


  render() {
    return (
      <View style = {styles.container}>
        <Text>My Movies</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a29bfe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyMovies;
