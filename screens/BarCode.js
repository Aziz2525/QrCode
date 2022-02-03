import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import barcodeItems from '../barcodeItems';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
const BarCode = ({navigation}) => {
  const [items, setItems] = useState(barcodeItems);
  const [searchItems, setSeacrhItems] = useState(barcodeItems);
  const [isSearch, setIsSearch] = useState(false);
  const search = e => {
    if (e.length > 0) {
      setIsSearch(true);
      const searchText = e.toLowerCase();
      const filteredItems = items.filter(item => {
        return item.text.toLowerCase().includes(searchText);
      });
      setSeacrhItems(filteredItems);
    } else {
      setIsSearch(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ara..."
            onChangeText={e => search(e)}
          />
          <Image
            source={require('../assets/images/search.png')}
            style={styles.searchImg}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{padding: 20, backgroundColor: 'white'}}>
        <View style={styles.barcodeItems}>
          {!isSearch
            ? items.map((data, index) => {
                return (
                  <TouchableOpacity
                    style={styles.cardView}
                    key={index}
                    onPress={() =>
                      navigation.push('BarcodeGenerator', {
                        name: data.text,
                        navigator: data.navigator,
                      })
                    }>
                    <View style={styles.imageView}>
                      <Image
                        source={data.image}
                        style={{width: data.width, height: data.height}}
                      />
                    </View>
                    <Text style={styles.cardText}>{data.text}</Text>
                  </TouchableOpacity>
                );
              })
            : searchItems.map((data, index) => {
                return (
                  <TouchableOpacity
                    style={styles.cardView}
                    key={index}
                    onPress={() =>
                      navigation.push('BarcodeGenerator', {
                        name: data.text,
                        navigator: data.navigator,
                      })
                    }>
                    <View style={styles.imageView}>
                      <Image
                        source={data.image}
                        style={{width: data.width, height: data.height}}
                      />
                    </View>
                    <Text style={styles.cardText}>{data.text}</Text>
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>
      <View>
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[AdMobBanner.simulatorId]}
        />
      </View>
    </View>
  );
};

export default BarCode;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  searchBar: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    height: 40,
    borderRadius: 300,
  },
  searchView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  searchInput: {
    width: '85%',
    fontFamily: 'Nunito-Bold',
  },
  searchImg: {
    width: 15,
    height: 15,
    tintColor: 'gray',
  },
  barcodeItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardView: {
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 20,
    paddingBottom: 20,
  },
  imageView: {
    backgroundColor: 'rgb(232,230,239)',
    padding: 10,
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    marginLeft: 15,
  },
});
