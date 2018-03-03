import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';


class LandingPage extends React.Component {

  render() {
    return (
      <View style = {styles.container}>
        <Text>Landing Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b894',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingPage;
