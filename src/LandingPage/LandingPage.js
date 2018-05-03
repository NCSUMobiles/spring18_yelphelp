import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Dimensions, Image, TouchableHighlight} from 'react-native';


class LandingPage extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);
    this.state = {
      numberOfBusinessesWithinTwoMiles : "Searching for close places...",
    }
  }

  componentDidMount(){
    this.getLocationAndFetchData();
  }
  getLocationAndFetchData(){
    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});
          console.log("fetching data");
          this.fetchData();
        },
        (error) => alert(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
  }

  fetchData() {
    var apiCall = "https://api.yelp.com/v3/businesses/search?";
    var lat = this.state.position.coords.latitude;
    var lng = this.state.position.coords.longitude;
    apiCall += "latitude=" + String(lat);
    apiCall += "&longitude=" + String(lng);
    apiCall += "&is_closed=false";
    apiCall += "&radius=3218";
    apiCall += "&limit=50";

    console.log(apiCall);
    var yelpKey = 'VEcz4Kbd8TR68oFnT4_mdnWjRL8J5qjeN0bKCMEIPZuODihSHM_9_v-5CCJGm_QM_-kO4hx9DS9u5_5UByUATrgquPE-SeFr6VvjdMhLapg4P1jWA5Gm-gp42U-gWnYx';


    fetch(apiCall, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + yelpKey,
      },
      body: undefined,
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var responseJsonBusinesses = responseJson.businesses;
        var arrayLength = responseJsonBusinesses.length;
        if (arrayLength >= 50){
          this.setState({numberOfBusinessesWithinTwoMiles: "At least " + arrayLength + " businesses within 2 miles"});
        }
        else{
          this.setState({numberOfBusinessesWithinTwoMiles: arrayLength + " businesses within 2 miles"});
        }
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
    return (
		<View style={{height:Dimensions.get('window').height}}>
        <View style = {styles.container}>
		  {/*https://github.com/react-native-training/react-native-fonts for list of available fonts*/}
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.05), alignItems:'center'}}>
    		<Image source={require('./yelphelp(final).png')} style={{width:90, height:75}} />
		</View>
		<View style={{height:Dimensions.get('window').height*(.15), top:Dimensions.get('window').height*(.03)}}>
				<Text style={styles.textTitle}>Welcome back, you!</Text>
		</View>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('RandomPlace')}>
			<View style={{alignItems:'center'}}>
				<View style={{height:150,width:200,backgroundColor:'#2d3436'}}>
					<Text style={{color:'white',textAlign:'center'}}>Find a random place to eat</Text>
					<View style={{top:2,height:129,width:200,backgroundColor:'#c8c8c8'}}>
						<Text style={{textAlign:'center', top:50}}>{this.state.numberOfBusinessesWithinTwoMiles}</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
		<View style={{height:50}}></View>
		<TouchableHighlight onPress={() => this.props.navigation.navigate('MySuggestions')}>
			<View style={{alignItems:'center'}}>
				<View style={{height:150,width:200,backgroundColor:'#2d3436'}}>
					<Text style={{color:'white',textAlign:'center'}}>Lorem Ipsum</Text>
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
    //fontFamily: 'Verdana',
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
