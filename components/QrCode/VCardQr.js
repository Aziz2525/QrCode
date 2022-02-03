import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import Modal from 'react-native-modal';
import {Box, Button, FormControl, Input, Stack, TextArea} from 'native-base';
import generateQrVcard from '../../api/QrCode/generateQrVcard';
const VCardQr = () => {
  const [generateQrImage, setGenerateQrImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [url, setUrl] = useState('');
  const [company, setCompany] = useState('');
  const [companyPos, setCompanyPos] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zip, setZip] = useState('');
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Resim İndirme İzni',
          message: 'Görüntüleri cihazınıza kaydetmek için izniniz gerekiyor',
          buttonNegative: 'Kapat',
          buttonPositive: 'Tamam',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        'Uzak Görüntüyü Kaydet',
        'Resmi kaydetmem için bana izin ver',
        [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } catch (err) {
      Alert.alert(
        'Uzak Görüntüyü Kaydet',
        'Resim kaydedilemedi: ',
        [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  const handleDownload = async () => {
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', `${generateQrImage}`)
      .then(res => {
        console.log(res);
        CameraRoll.saveToCameraRoll(res.path());
      })
      .catch(error => console.log(error));
  };
  const generator = async () => {
    var light = await AsyncStorage.getItem('bgColor');
    var dark = await AsyncStorage.getItem('qrColor');
    const data = {
      fn,
      ln,
      email,
      phone,
      fax,
      url,
      company,
      companyPos,
      country,
      city,
      street,
      zip,
      light,
      dark,
    };
    generateQrVcard(data).then(res => {
      if (res.success) {
        setGenerateQrImage(res.base64);
        setIsModalVisible(true);
      }
    });
  };
  return (
    <>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Adınız</FormControl.Label>
        <Input
          placeholder="Adınızı giriniz"
          variant="underlined"
          onChangeText={e => setFn(e)}
          value={fn}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Soyadınız</FormControl.Label>
        <Input
          placeholder="Soyadınızı giriniz"
          variant="underlined"
          onChangeText={e => setLn(e)}
          _focus={{borderColor: '#FFA500'}}
          value={ln}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Email giriniz"
          variant="underlined"
          onChangeText={e => setEmail(e)}
          _focus={{borderColor: '#FFA500'}}
          value={email}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Cep Telefonu</FormControl.Label>
        <Input
          placeholder="Cep Telefonunuzu giriniz"
          variant="underlined"
          onChangeText={e => setPhone(e)}
          _focus={{borderColor: '#FFA500'}}
          value={phone}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Faks</FormControl.Label>
        <Input
          placeholder="Faks giriniz"
          variant="underlined"
          onChangeText={e => setFax(e)}
          _focus={{borderColor: '#FFA500'}}
          value={fax}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>İnternet Adresi</FormControl.Label>
        <Input
          placeholder="İnternet Adresinizi giriniz"
          variant="underlined"
          onChangeText={e => setUrl(e)}
          _focus={{borderColor: '#FFA500'}}
          value={url}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Şirket Bilgileri</FormControl.Label>
        <Input
          placeholder="Şirketinizi giriniz"
          variant="underlined"
          onChangeText={e => setCompany(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
          value={company}
        />
        <Input
          placeholder="İş Pozisyonunuzu giriniz"
          variant="underlined"
          onChangeText={e => setCompanyPos(e)}
          _focus={{borderColor: '#FFA500'}}
          value={companyPos}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Adres Bilgileri</FormControl.Label>
        <Input
          placeholder="Ülkenizi giriniz"
          variant="underlined"
          onChangeText={e => setCountry(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
          value={country}
        />
        <Input
          placeholder="Şehrinizi giriniz"
          variant="underlined"
          onChangeText={e => setCity(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
          value={city}
        />
        <Input
          placeholder="Sokağınızı giriniz"
          variant="underlined"
          onChangeText={e => setStreet(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
          value={street}
        />
        <Input
          placeholder="Zip kodunuzu giriniz"
          variant="underlined"
          onChangeText={e => setZip(e)}
          value={zip}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <Stack
        style={{alignItems: 'flex-end'}}
        direction={{
          base: 'column',
          md: 'row',
        }}
        space={4}>
        <Button
          _text={{color: 'white', fontFamily: 'Nunito-ExtraBold', fontSize: 15}}
          onPress={() => generator()}
          style={{
            backgroundColor: 'orange',
            color: 'white',
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 20,
            marginBottom: 30,
          }}>
          QR Oluştur
        </Button>
      </Stack>
       <Modal isVisible={isModalVisible} swipeDirection="left" propagateSwipe>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20,
          }}>
          {generateQrImage &&
            ((
              <>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={styles.closeBtn}>
                  <Image
                   source={require('../../assets/images/close.png')}
                    style={{width: 30, height: 30, tintColor: 'gray'}}
                  />
                </TouchableOpacity>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.generateQrText}>
                    Qrcode Başarıyla Oluşturuldu
                  </Text>
                  <View style={styles.downloadView}>
                    <Image
                      source={{uri: `${generateQrImage}`}}
                      style={styles.qrImage}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.download}
                    onPress={() => handleDownload()}>
                    <Image
                      source={require('../../assets/images/download.png')}
                      style={{width: 20, height: 20, tintColor: '#565656'}}
                    />
                    <Text style={styles.downloadText}>Qr Code'u İndir</Text>
                  </TouchableOpacity>
                </View>
              </>
            ): null)}
        </View>
      </Modal>
    </>
  );
};

export default VCardQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  qrImage: {
    width: 264,
    height: 264,
    borderRadius:5
  },
  generateQrText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 19,
    marginBottom: 20,
    marginTop:20
  },
  downloadView: {
    position: 'relative',
  },
  download: {
    borderRadius: 3,
    padding: 10,
    width: '85%',
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  downloadText: {
    fontFamily: 'Nunito-Bold',
    color: '#565656',
    marginLeft: 10,
  },
});
