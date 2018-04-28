import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Dimensions, Image, TouchableHighlight} from 'react-native';


class LandingPage extends React.Component<ScreenProps<>> {

  render() {
    return (
		<View style={{height:Dimensions.get('window').height}}>
        <View style = {styles.container}>
		  {/*https://github.com/react-native-training/react-native-fonts for list of available fonts*/}
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.05), alignItems:'center'}}>
    		<Image source={require('./yelphelp(final).png')} style={{width:90, height:75}} />
		</View>
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.03)}}>
				<Text style={styles.textTitle}>Welcome back you!</Text>
		</View>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('RandomPlace')}>
			<View style={{alignItems:'center'}}>
				<View style={{height:150,width:200,backgroundColor:'#2d3436'}}>
					<Text style={{color:'white',textAlign:'center'}}>Name</Text>
					<View style={{top:2,height:129,width:200,backgroundColor:'#c8c8c8'}}>
						<Text style={{textAlign:'center', top:50}}># in the card example</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
		<View style={{height:50}}></View>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('MySuggestions')}>
			<View style={{alignItems:'center'}}>
				<View style={{height:150,width:200,backgroundColor:'#2d3436'}}>
					<Text style={{color:'white',textAlign:'center'}}>Name</Text>
					<View style={{top:2,height:129,width:200,backgroundColor:'#c8c8c8'}}>
						<Text style={{textAlign:'center', top:50}}># in the card example</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
		</View>
		</View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  textTitle: {
  // fontFamily: 'Roboto',
  // fontFamily: 'Verdana',
	fontSize: 22,
	textShadowOffset: {width:2, height:2},
	textShadowColor: '#d3d3d3',
	textShadowRadius: 5,
	textAlign: 'center',
	fontWeight: 'bold'
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  textLink: {

  }

});

export default LandingPage;
