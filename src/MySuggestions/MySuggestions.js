import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, SectionList, Platform, Alert, Image, Linking, TouchableOpacity, RefreshControl} from 'react-native';
import { OpenMapDirections } from 'react-native-navigation-directions';
import call from 'react-native-phone-call'

//working
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


class MySuggestions extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);
    this.state = {
      responseJson: [],
      price: -1,
      radius: -1,
      term: "",
      businesses: [],
      refreshing: false,
    }
  }

  _makeCall(businessPhone){

    const args = {
      number: businessPhone, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch(console.error)
  }

  // This method will open up the default navigation app with directions.
  _callShowDirections = (businessLocations) => {

    navigator.geolocation.getCurrentPosition(

      (position) => {
        this.setState({position});
      },

      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}

    );

    const startPoint = {
      longitude: this.state.position.coords.longitude,
      latitude: this.state.position.coords.latitude
    }

    const endPoint = {
      longitude: parseFloat(businessLocations[1]) ,
      latitude: parseFloat(businessLocations[0])
    }

		const transportPlan = 'd';

    OpenMapDirections(startPoint, endPoint, transportPlan).then(res => {
      console.log(res)
    });
  }


  state = {
    position: 'unknown'
  };

  componentDidMount() {
    var businesses = [];
    this.setState(businesses);
    this.getLocationAndFetchData();
  };

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
              //var arrayLength = responseJsonBusinesses.length;
              // var selectedBusiness = Math.floor((Math.random() * arrayLength) + 1);
              // console.log("selected business " + selectedBusiness);
              // var newBiz = new Business(responseJsonBusinesses[selectedBusiness]);
              // console.log(newBiz.name);
              // this.state.selectedBusiness = newBiz;
              // console.log(this.state.selectedBusiness.name);

              //save every single business item into an array
              var i = 0;
              for(i; i<responseJsonBusinesses.length; i++){
                  //var businessJson = responseJsonBusinesses[i];
                  var newBiz = new Business(responseJsonBusinesses[i]);
                  // alert(newBiz.name);
                  this.state.businesses.push(newBiz);
                  console.log(this.state.businesses.length);
              }
              this._onRefresh();



          })
          .catch((error) =>{
              console.error(error);
          });
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }

    _onRefresh(){
      this.setState({refreshing: true});
      //this.getLocationAndFetchData(); //.then(() => {this.setState({refreshing: true}));
      this.setState({refreshing:false});
    }

  render() {

    return (

      <View style={styles.listViewContainer}>
      <SectionList
        sections={[
          {title: "MY SUGGESTIONS", data: this.state.businesses }//[testBusiness, testBusiness, testBusiness, testBusiness, testBusiness]}
          // {title: "RESULTS", data: [testBusiness, testBusiness, testBusiness]}
        ]}
        refreshControl={
            <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh = {this._onRefresh.bind(this)}
            />
        }

        renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
        renderItem={ ({item}) =>
          <View>
            <View style={styles.CardHeader}>
              <Text style={styles.headerText}> { item.name } </Text>
            </View>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: 130, height: 130}}
                  source={{uri: item.image_url}}
                />
              </View>
              <View>
                <Text style={styles.cardText}> Rating: { item.rating } </Text>
                <Text style={styles.cardText}> Price: {item.price } </Text>

                <Text style={{color: 'blue',     fontSize : 20, textDecorationLine: 'underline', marginLeft : 5,
                }}
                      onPress={() => Linking.openURL(item.url)}>
                    Link
                </Text>

                <Text style={styles.cardText}> {item.display_phone} </Text>
              </View>
            </View>

            <View style={styles.SectionListButtonStyle}>
              <View style={styles.cardButtonStyle}>
                <TouchableOpacity activeOpacity = {.5} onPress = {() => this._callShowDirections(item.coordinates)} >
                  <Image
                  style={{width: 60, height: 60}}
                  source={require('./img/directions.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.cardButtonStyle}>
                <TouchableOpacity activeOpacity = {.5} onPress = {() => this._makeCall(item.phone)}>
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
          </View>
        }
        keyExtractor={ (item, index) => index }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listViewContainer: {
    marginTop : 24,
    backgroundColor : '#636e72',
    backgroundColor: '#dfe6e9',
  },

  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  SectionHeaderStyle:{
    backgroundColor : '#d63031',
    fontSize : 20,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
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
  },

  cardText: {
      //color: '#fff',
      fontSize: 20,
      //fontWeight: 'bold',
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
  }

});

export default MySuggestions;
