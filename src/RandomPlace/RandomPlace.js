import React from 'react';
import {StyleSheet, View, Text, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, Dimensions, Animated,  Platform, Alert, Linking, TouchableOpacity} from 'react-native';
//import OAuthSimple from 'oauthsimple'
import image from '../img/yelphelp(final).png'

class Business {
  constructor(jsonBusiness){
    this.id = jsonBusiness.id;
    this.name = jsonBusiness.name;
    this.image_url = jsonBusiness.image_url;
    this.is_closed = jsonBusiness.is_closed;
    this.url = jsonBusiness.url;
    this.review_count = jsonBusiness.review_count;
    this.categories = jsonBusiness.categories;
    this.rating = jsonBusiness.rating;
    this.coordinates = jsonBusiness.coordinates;
    this.transactions = jsonBusiness.transactions;
    this.price = jsonBusiness.price;
    this.location = jsonBusiness.location;
    this.phone = jsonBusiness.phone;
    this.display_phone = jsonBusiness.display_phone;
    this.distance = jsonBusiness.distance;
  }
}


class RandomPlace extends React.Component<ScreenProps<>> {
		constructor() {
		super()
		this.state = {
			spinValue: new Animated.Value(0),
			responseJson: [],
			price: -1,
			radius: -1,
			term: "",
		}
	}

  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       console.log("first location fetch done");
    //       this.setState({position});
    //     },
    //     (error) => alert(error),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    //   );
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item);
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

	//Radius
	if (this.state.radius != -1) {
		apiCall += "&radius=" + String(this.state.radius);
	}

	if (this.state.term != "") {
		apiCall += "&term=" + this.state.term;
	}
	if (this.state.price != -1) {
		if (this.state.price == 1) {
			apiCall += "&price=1";
		} else if (this.state.price == 2) {
			apiCall += "&price=1, 2";
		} else if (this.state.price == 3) {
			apiCall += "&price=1, 2, 3";
		} else if (this.state.price == 4) {
			apiCall += "&price=1, 2, 3, 4";
		}
	}

	apiCall += "&limit=50";
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
        var selectedBusiness = Math.floor((Math.random() * arrayLength) + 1);
        console.log("selected business " + selectedBusiness);
        console.log(responseJsonBusinesses[selectedBusiness]);
        this.state.selectedBusiness = new Business(responseJsonBusinesses[selectedBusiness]);
        console.log(this.state.selectedBusiness.name);

      })
      .catch((error) =>{
        console.error(error);
      });
  }



 	async spin() {
    this.getLocationAndFetchData();
		const soundObject = new Expo.Audio.Sound();
		try {
			await soundObject.loadAsync(require('./roulette.mp3'));
			await soundObject.playAsync();
			// Your sound is playing!
		} catch (error) {
			// An error occurred!
		}

		this.state.spinValue.setValue(0);
		Animated.timing(
		this.state.spinValue,
		{
			toValue: 1,
			duration: 7000
		}
		).start();
	}


  render() {
	  let animationStyle = {
			transform: [{rotate: this.state.spinValue.interpolate({
									inputRange: [0, 1],
									outputRange: ['0deg', '1440deg']
								 })
						}],
      width: 300,
      height: 300
		}
    return (
    <View style= {styles.container}>
  	  <View style={styles.form} >
    		<View style={styles.title}>
    			<Image source={require('./yelphelp(final).png')} style={{width:60, height:50}} />
    		</View>


    		<View style={styles.categories}>
    			<Text style={{color: 'white',fontSize:16}} > Select a Category of Food </Text>
    			<View style={{width:10}} />
    			<Picker style={{width: 150, height:30, color:'black'}}>
    				<Picker.Item label = "Mexican" value = "mex" />
    				<Picker.Item label = "Chinese" value = "chin" />
    			</Picker>
    		</View>

    		<View style={styles.categories}>
    			<Text style={{color: 'white',fontSize:16, borderColor:'white'}} > Max Radius </Text>
    			<View style={{width:10}} />
    			<Picker style={{width: 100, height:25, color:'black'}}>
    				<Picker.Item label = "5" value = "five" />
    				<Picker.Item label = "10" value = "ten" />
    				<Picker.Item label = "25" value = "twenty-five" />
    				<Picker.Item label = "50" value = "fifty" />
    			</Picker>
    		</View>

    		<View style={styles.categories}>
    			<Text style={{color: 'white',fontSize:16}} > Price Range </Text>
    			<View style={{width:10}} />
    			<TextInput textAlign = 'center' style={{height: 25, width:25, borderColor: 'white', borderWidth: 1}} />
    			<View style={{width:5}} />
    			<Text style={{color: 'black',fontSize:16}} > to </Text>
    			<View style={{width:5}} />
    			<TextInput textAlign = 'center' style={{height: 25, width:25, borderColor: 'white', borderWidth: 1}} />
    		</View>

        {this.state.selectedBusiness &&
          <View style={styles.resultCard}>
            <Text>Spun</Text>
          </View>}

    		<View style={{alignItems:'center'}}>
    		<TouchableHighlight style={{position:'absolute'}} onPress={this.spin.bind(this)} >
    				<Animated.Image style={animationStyle} source={require('./roulette.png')}>
    				</Animated.Image>
    		</TouchableHighlight>
    		</View>
      </View>
    </View>

    );
  }
}

class Spinner extends React.Component {


	render() {
		return (
		<Animated.Image style={animationStyle} source={require('./roulette.png')}>

		</Animated.Image>

		)
	}
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
  	backgroundColor: '#176543',
  },
  categories: {
  	flexDirection: 'row',
  	top: 10,
  	height: 60,
  },
  title: {
  	alignItems: 'center',
  	height: 80,
  	top: 30
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  spinner: {
	  position:'absolute'
  },


});

export default RandomPlace;
