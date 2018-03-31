import React from 'react';
import {StyleSheet, View, Text, ScrollView, Button, SectionList, Platform, Alert} from 'react-native';

//working
class Business {
  constructor(){
    this.id = 1;
    this.name = "Dustin";
    this.image_url = "http://www.google.com";
    this.is_closed = false;
    this.url = "http://www.google.com";
    this.review_count = 1;
    this.categories = ["Dustin"];
    this.rating = "$$";
    this.coordinates = ["12", "23"];
    this.transactions = 321;
    this.price = "$$";
    this.location = "Raleigh";
    this.phone = "123456789";
    this.display_phone = "(123)-456-7890";
    this.distance = 321.43;
  }
}

class RandomPlace extends React.Component<ScreenProps<>> {
  constructor(props){
    super(props);

    var asdf = new Business();
    console.log(asdf.id);
  }

  GetSectionListItem=(item)=>{
      Alert.alert(item);
    }

  render() {

    var A = ['Apple', 'Apricot', 'Avocado','A', 'A', 'A', 'A', 'A', 'A'] ;
    var B = ['Banana', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry'] ;
    var C = ['Cherry', 'Coconut'] ;


    return (
      <View style={{ marginTop : 24}}>
      <SectionList

          sections={[
            { title: 'Fruits Name From A', data: A },
            { title: 'Fruits Name From B', data: B },
            { title: 'Fruits Name From C', data: C },
          ]}

          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title } </Text> }
          renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} onPress={this.GetSectionListItem.bind(this, item)}> { item } </Text> }
          keyExtractor={ (item, index) => index }

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionHeaderStyle:{

  backgroundColor : '#CDDC39',
    fontSize : 20,
    padding: 5,
    color: '#fff',
  },

  SectionListItemStyle:{
    fontSize : 15,
    padding: 5,
    color: '#000',
    backgroundColor : '#F5F5F5'
  }
});

export default RandomPlace;
