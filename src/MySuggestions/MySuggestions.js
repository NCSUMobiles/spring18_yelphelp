import React from 'react';
import {StyleSheet, View, Text, ScrollView, SectionList, Image} from 'react-native';


class Business{
  constructor(){
    this.image_url = "https://s3-media1.fl.yelpcdn.com/bphoto/H_vQ3ElMoQ8j1bKidrv_1w/o.jpg";
    this.name = "NAME";
    this.rating = "RATING";
    this.price = "PRICE";
    this.url = "URL";
    this.display_phone = "DISPLAY_PHONE";
  }
}

class MySuggestions extends React.Component<ScreenProps<>> {

  render() {
    var biz = new Business();
    return (
      <View style = {styles.container}>
      <SectionList

          sections={[
            {title: "RESULTS", data: [biz, biz, biz, biz, biz, biz]}
          ]}

          renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.title} </Text> }
          renderItem={ ({item}) =>
            <View style={styles.SectionListItemStyle}>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={{uri: item.image_url}}
                />
              </View>
              <View>
                <Text  onPress={this.GetSectionListItem.bind(this, item)}> { item.name } </Text>
                <Text> Rating: { item.rating } </Text>
                <Text> Price: {item.price } </Text>
                <Text onPress={() => Linking.openURL(item.url)}> Link </Text>
                <Text> {item.display_phone} </Text>
              </View>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('./img/directions.png')}
                />
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
  container: {
    flex: 1,
    backgroundColor: '#a29bfe',
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
    padding: 5,
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor : '#FFF',
  }
});

export default MySuggestions;
