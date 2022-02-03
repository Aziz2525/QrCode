import {
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Code128A from '../components/BarCode/Code128A';
import Code128auto from '../components/BarCode/Code128auto';
import Code128B from '../components/BarCode/Code128B';
import Code128C from '../components/BarCode/Code128C';
import EAN13 from '../components/BarCode/EAN13';
import EAN8 from '../components/BarCode/EAN8';
import UPC from '../components/BarCode/UPC';
import CODE39 from '../components/BarCode/CODE39';
import ITF14 from '../components/BarCode/ITF14';
import ITF from '../components/BarCode/ITF';
import MSI from '../components/BarCode/MSI';
import MSI10 from '../components/BarCode/MSI10';
import MSI11 from '../components/BarCode/MSI11';
import MSI1010 from '../components/BarCode/MSI1010';
import MSI1110 from '../components/BarCode/MSI1110';
import Pharmacode from '../components/BarCode/Pharmacode';
import {ColorPicker} from 'react-native-color-picker';
const {width, height} = Dimensions.get('window');
const BarCodeGenerator = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bgColor, setBgColor] = React.useState('#ffffff');
  const [qrColor, setQrColor] = React.useState('#000000');
  useEffect(() => {
    const bootstrap = () => {
      AsyncStorage.getItem('bgColor').then(value => {
        setBgColor(value);
      });
      AsyncStorage.getItem('qrColor').then(value => {
        setQrColor(value);
      });
    };
    bootstrap();
  }, []);
  navigation.setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../assets/images/color-picker.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
      );
    },
  });
  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={100}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 2,
              borderBottomColor: '#EEEEEE',justifyContent:'space-between'}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
            <Text>Arkaplan Rengi: </Text>
            <View
              style={{
                backgroundColor: bgColor + '8A',
                padding: 3,
                borderRadius: 10,
              }}>
              <Text>{bgColor}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
             
            }}>
            <Text>QR Rengi: </Text>
            <View
              style={{
                backgroundColor: qrColor + '8A',
                padding: 3,
                borderRadius: 10,
              }}>
              <Text>{qrColor}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.container}>
          {route.params.navigator === 'Code128 auto' ? (
            <Code128auto route={route}/>
          ) : route.params.navigator === 'Code128 A' ? (
            <Code128A route={route}/>
          ) : route.params.navigator === 'Code128 B' ? (
            <Code128B route={route}/>
          ) : route.params.navigator === 'Code128 C' ? (
            <Code128C route={route}/>
          ) : route.params.navigator === 'EAN13' ? (
            <EAN13 route={route}/>
          ) : route.params.navigator === 'EAN8' ? (
            <EAN8 route={route}/>
          ) : route.params.navigator === 'UPC' ? (
            <UPC route={route}/>
          ) : route.params.navigator === 'CODE39' ? (
            <CODE39 route={route}/>
          ) : route.params.navigator === 'ITF14' ? (
            <ITF14 route={route}/>
          ) : route.params.navigator === 'ITF' ? (
            <ITF route={route}/>
          ) : route.params.navigator === 'MSI' ? (
            <MSI route={route}/>
          ) : route.params.navigator === 'MSI10' ? (
            <MSI10 route={route}/>
          ) : route.params.navigator === 'MSI11' ? (
            <MSI11 route={route}/>
          ) : route.params.navigator === 'MSI1010' ? (
            <MSI1010 route={route}/>
          ) : route.params.navigator === 'MSI1110' ? (
            <MSI1110 route={route}/>
          ) : route.params.navigator === 'PHARMACODE' ? (
            <Pharmacode route={route}/>
          ) : null}
        </ScrollView>
        <View style={{width: width}}>
          <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            testDevices={[AdMobBanner.simulatorId]}
          />

          {/* <PublisherBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          testDevices={[PublisherBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
          onAppEvent={event => console.log(event.name, event.info)}
        /> */}
        </View>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.hideModalBtn}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../assets/images/close.png')}
            style={{width: 30, height: 30, tintColor: 'gray'}}
          />
        </Pressable>
        <View style={{flex: 1}}>
          <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 20}}>
              QR Arkaplan Rengi
            </Text>
          </View>
          <ColorPicker
            onColorSelected={async color => {
              await AsyncStorage.setItem('bgColor', color);
              setBgColor(color);
              setModalVisible(!modalVisible);
            }}
            style={{flex: 0.5, padding: 20}}
          />
          <View style={{padding: 20}}>
            <Text style={{fontFamily: 'Nunito-Bold', fontSize: 20}}>
              QR Rengi
            </Text>
          </View>
          <ColorPicker
            onColorSelected={async color => {
              await AsyncStorage.setItem('qrColor', color);
              setQrColor(color);
              setModalVisible(!modalVisible);
            }}
            style={{flex: 0.5, padding: 20}}
          />
        </View>
      </Modal>
    </>
  );
};

export default BarCodeGenerator;

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    backgroundColor: 'white',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  infoText: {
    fontSize: 12,
    color: '#7D7D7D',
    fontWeight: '700',
  },
  inputViewC: {
    width: '70%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  colorBg: {
    width: '60%',
    height: 30,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
  },
  colorBgBtn: {
    marginLeft: 5,
    width: '10%',
    height: 30,
  },
  bgSelectBtn: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  hideModalBtn: {
    marginTop: 50,
    marginLeft: 20,
  },
});
