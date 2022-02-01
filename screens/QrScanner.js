import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  ImageBackground,
  Image,
  PixelRatio,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import LottieView from 'lottie-react-native';

const QrScanner = () => {
  const [scanQr, setScanQr] = React.useState(null);
  const onSuccess = e => {
    setScanQr(e);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );
  };
  const seeLink = () => {
    Linking.openURL(scanQr.data);
  };
  if (scanQr) {
    return (
      <View style={styles.lottieView}>
        <LottieView
          source={require('../assets/lottie/68692-qr-code-scanner.json')}
          autoPlay
          loop
          style={styles.imageStyle}
        />
        <View style={styles.scanView}>
          <View style={styles.scanViewModal}>
            <Text>{scanQr.data}</Text>
          </View>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setScanQr(null)}>
              <Text style={styles.backText}>Geri dön</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goBtn} onPress={() => seeLink()}>
              <Text style={styles.goText}>Linki Gör</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <QRCodeScanner
      reactivate={true}
      showMarker={true}
      topContent={
        <Text style={styles.centerText}>
          Lütfen kameranızı {'\n'} QR Kodunun üzerine getirin
        </Text>
      }
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      containerStyle={{backgroundColor: 'white'}}
    />
  );
};

export default QrScanner;

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    textAlign: 'center',
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  cameraIcon: {
    width: 30,
    height: 30,
  },
  scanView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanViewModal: {
    backgroundColor: '#E1E1E1',
    padding: 20,
    borderRadius: 10,
  },
  lottieView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backBtn: {
    width: '40%',
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  goBtn: {
    marginLeft: 10,
    width: '40%',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
  },
  goText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Nunito-Bold',
  },
  backText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Nunito-Bold',
  },
});
