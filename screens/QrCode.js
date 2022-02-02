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
import qrcodeItems from '../qrcodeItems';

const QrCode = ({navigation}) => {
  const [items, setItems] = useState(qrcodeItems);
  const [searchItems, setSeacrhItems] = useState(qrcodeItems);
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
                      navigation.push('QrGenerator', {
                        name: data.text,
                        navigator: data.navigator,
                      })
                    }>
                    <Image
                      source={data.image}
                      style={{width: data.width, height: data.height}}
                    />
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
                      navigation.push('QrGenerator', {
                        name: data.text,
                        navigator: data.navigator,
                      })
                    }>
                    <Image
                      source={data.image}
                      style={{width: data.width, height: data.height}}
                    />
                    <Text style={styles.cardText}>{data.text}</Text>
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
};

export default QrCode;

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
    paddingBottom:10
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
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
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
  cardText: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'Nunito-Regular',
  },
});
