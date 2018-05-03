import React from 'react';
import {StyleSheet, View, Text, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, Dimensions, Animated,  Platform, Alert, Linking, TouchableOpacity} from 'react-native';
//import OAuthSimple from 'oauthsimple'
import image from '../img/yelphelp(final).png'
import { OpenMapDirections } from 'react-native-navigation-directions';
import call from 'react-native-phone-call'



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
			show: false,
			timePassed: false,
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
		this.setView();
		
		setTimeout(() => {this.setState({show: !this.state.show});}, 6900);	
	}
	
	setView = () => {
		if( this.state.show ) {
		return(	
		(<View style={styles.listViewContainer}>
            <View style={styles.CardHeader}>
              <Text style={styles.headerText}> { this.state.selectedBusiness.name } </Text>
            </View>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: 130, height: 130}}
                  source={{uri: this.state.selectedBusiness.image_url}}
                />
              </View>
              <View>
                <Text style={styles.cardText}> Rating: { this.state.selectedBusiness.rating } </Text>
                <Text style={styles.cardText}> Price: { this.state.selectedBusiness.price } </Text>

                <Text style={styles.cardLink}
                      onPress={() => Linking.openURL(this.state.selectedBusiness.url)}>
                    Link
                </Text>

                <Text style={styles.cardText}> {this.state.selectedBusiness.display_phone} </Text>
              </View>
            </View>

            <View style={styles.SectionListButtonStyle}>
              <View style={styles.cardButtonStyle}>
                <TouchableOpacity activeOpacity = {.5} onPress = {() => this._callShowDirections(this.state.selectedBusiness.coordinates)} >
                  <Image
                  style={{width: 60, height: 60}}
                  source={require('./img/directions.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardButtonStyle}>
                <TouchableOpacity activeOpacity = {.5} onPress = {() => this._makeCall(this.state.selectedBusiness.phone)}>
                  <Image
                  style={{width: 60, height: 60}}
                  source={require('./img/phone.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardButtonStyle}>
                <TouchableOpacity activeOpacity = {.5} >
                  <Image
                  style={{width: 60, height: 60}}
                  source={require('./img/disk.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>)) } else {
			return ( null )
		}
	}
	
	 _callShowDirections = (businessLocations) => {

    if (this.state.position.coords.longitude == null){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({position});
          const startPoint = {
            longitude: this.state.position.coords.longitude,
            latitude: this.state.position.coords.latitude
          }

          const endPoint = {
            longitude: parseFloat(businessLocations.longitude) ,
            latitude: parseFloat(businessLocations.latitude)
          }

      		const transportPlan = 'd';

          OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
            console.log(res)
          });
        },
        (error) => alert(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }
    else{
      const startPoint = {
        longitude: this.state.position.coords.longitude,
        latitude: this.state.position.coords.latitude
      }

      const endPoint = {
        longitude: parseFloat(businessLocations.longitude) ,
        latitude: parseFloat(businessLocations.latitude)
      }

      const transportPlan = 'd';

      OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
        console.log(res)
      });
    }
  }

    _makeCall(businessPhone){

    const args = {
      number: businessPhone, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch(console.error)
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
				   <View style={{width:Dimensions.get('window').width*(.4), }}></View>
					<TouchableHighlight style={{position:'absolute', marginLeft:5}} onPress={() => {this.setState({show: false});}} >
						<Image source={require('./reload.png')} style={{width:60, height:50}} />
					</TouchableHighlight>
    			<Image source={require('./yelphelp(final).png')} style={{width:100, height:80}} />
    		</View>

    		<View style={{alignItems:'center', top:Dimensions.get('window').height*(.1)}}>
    		<TouchableHighlight style={{position:'absolute'}} onPress={this.spin.bind(this)} >
    				<Animated.Image style={animationStyle} source={require('./roulette.png')}>
    				</Animated.Image>
    		</TouchableHighlight>
			<View>
			{this.setView()}
			</View>
    		</View>
      </View>
    </View>

    );
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
  	top: 30,
	flexDirection: 'row',
  },
  form: {
	  flex: 1,
	  flexDirection: 'column',
  },
  spinner: {
	  position:'absolute'
  },
  SectionListItemStyle:{
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor : '#FFF',
  },

  CardHeader:{
    backgroundColor: '#2d3436',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },

  headerText:{
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 5,
  },

  cardText: {
    fontSize: 20,
  },

  cardLink: {
    color: 'blue',
    fontSize : 20,
    textDecorationLine: 'underline',
    marginLeft : 5,
  },

  SectionListButtonStyle: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor : '#FFF',
    justifyContent: 'center',
  },

  cardButtonStyle: {
    margin: 15,
  },
  listViewContainer: {
    // backgroundColor : '#636e72',
    backgroundColor: '#dfe6e9',
  },


});

export default RandomPlace;
