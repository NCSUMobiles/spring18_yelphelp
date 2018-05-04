import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, Dimensions, SectionList, Platform, Alert, Image, Linking, TouchableOpacity, RefreshControl} from 'react-native';
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


  componentDidMount() {
    //This will need to be removed when we get disk reads down
    this.getLocationAndFetchData();

    // when the method call ablove gets deleted, un-comment this section
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         this.setState({position});
    //     },
    //     (error) => alert(error),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );

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

      // let's make sure that the stores are open
      apiCall += "&is_closed=false";
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
              var i = 0;
              for(i; i<responseJsonBusinesses.length; i++){
                  var newBiz = new Business(responseJsonBusinesses[i]);
                  this.state.businesses.push(newBiz);
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
      this.setState({refreshing:false});
    }

  renderStars(item){
    const res = [];
    for(let i = 1; i <= 5; i++) {
      if(i <= item.rating ) {
        res.push(
          <Image 
          style={{width:25, height:25}}
          source={require('../img/1x/star-gold.png')}
          key={'star_'+i} />
        );
      }
      else {
        res.push(<Image 
          style={{width:25, height:25}}
          source={require('../img/1x/star-gray.png')}
          key={'star_'+i} />
        );
      }
    }
    return res;
  }

  render() {

    return (

      <View style={styles.container}>
      <SectionList
        refreshControl={
            <RefreshControl
              refreshing = {this.state.refreshing}
              onRefresh = {this._onRefresh.bind(this)}
            />
        }
        sections={[
          {title: "MY SUGGESTIONS", data: this.state.businesses }//[testBusiness, testBusiness, testBusiness, testBusiness, testBusiness]}
          // {title: "RESULTS", data: [testBusiness, testBusiness, testBusiness]}
        ]}

        renderSectionHeader={ ({section}) => <View style={styles.SectionHeaderStyle}><Text style={styles.SectionHeaderText}> { section.title } </Text></View> }
        renderItem={ ({item}) =>
          <View style={styles.listViewContainer}>
            <View style={styles.CardHeader}>
              <Text style={styles.headerText}> { item.categories[0].title.toUpperCase() } </Text>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                {this.renderStars(item)}
              </View>
            </View>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: Dimensions.get('window').width -25, height: Dimensions.get('window').height / 3}}
                  source={{uri: item.image_url}}
                />
              </View>
              <View>
                <Text style={{fontSize: 18, paddingBottom: 5}}> { item.name }  <Text style={{color: 'green'}}>{ item.price }</Text>
                </Text>

                <Text style={styles.addressText}> { item.location.display_address[0]}, { item.location.city}, { item.location.state} { item.location.zip_code}
                </Text>

                <Text style={styles.cardLink}
                      onPress={() => Linking.openURL(item.url)}>
                    Show Reviews
                </Text>

                <Text style={styles.cardText}> {item.display_phone} </Text>
              </View>
            </View>

            <View style={styles.SectionListButtonStyle}>
              <TouchableOpacity activeOpacity = {.5} onPress = {() => this._callShowDirections(item.coordinates)} >
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/directions.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = {.5} onPress = {() => this._makeCall(item.phone)}>
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/phone.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = {.5} >
                <Image
                style={{width: 20, height: 20}}
                source={require('../img/disk.png')}
                />
              </TouchableOpacity>
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
    backgroundColor: '#dfe6e9',
    borderWidth: 2,
    borderColor: '#dfe6e9',
    borderRadius: 15,
    margin: 10,
  },

  container: {
    backgroundColor: '#176543',
  },

  SectionHeaderStyle:{
    marginTop: 10,
    marginBottom: 5,
    height: 60,
    flex: .5,
    justifyContent: 'flex-end',
  },

  SectionHeaderText:{
    fontSize : 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    padding: 5,
    color: '#fff',
    textAlign: 'center',
  },

  SectionListItemStyle:{
    padding: 5,
    flexDirection: 'column',
    backgroundColor : '#FFF',
  },

  CardHeader:{
    margin: 5,
    marginLeft: 10,
    marginRight:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerText:{
    color: '#696969',
    fontSize: 24,
    margin: 5,
  },

  cardText: {
    fontSize: 16,
  },

  addressText: {
    fontSize: 16,
    fontStyle: 'italic',
  },

  cardLink: {
    color: 'blue',
    fontSize : 16,
    marginLeft : 5,
  },

  SectionListButtonStyle: {
    padding: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor : '#FFF',
    
  },

  cardButtonStyle: {
    margin: 0,
  },

});

export default MySuggestions;
