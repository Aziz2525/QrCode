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
import {Box, Button, Input, FormControl, Stack, TextArea} from 'native-base';
import generateQrEmail from '../../api/QrCode/generateQrEmail';

const EmailQr = () => {
  const [generateQrImage, setGenerateQrImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
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
      .fetch('GET', `data:image/png;base64,${generateQrImage}`)
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
      email,
      subject,
      message,
      light,
      dark,
    };
    generateQrEmail(data).then(res => {
      if (res.success) {
        setGenerateQrImage(res.base64);
        setIsModalVisible(true);
      }
    });
  };
  return (
    <View>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Emailinizi giriniz"
          onChangeText={e => setEmail(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Konu</FormControl.Label>
        <Input
          placeholder="Konu giriniz"
          onChangeText={e => setSubject(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Mesaj</FormControl.Label>
        <Input
          placeholder="Mesaj giriniz"
          onChangeText={e => setMessage(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <Stack space={14} style={{alignItems: 'flex-end'}}>
        <Button
          onPress={() => generator()}
          _text={{
            color: 'white',
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 15,
            fontWeight: 'bold',
          }}
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
                      source={{uri: `data:image/png;base64,${generateQrImage}`}}
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
    </View>
  );
};

export default EmailQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  qrImage: {
    width: 264,
    height: 264,
    borderRadius: 5,
  },
  generateQrText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 19,
    marginBottom: 20,
    marginTop: 20,
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
