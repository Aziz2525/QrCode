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
import {
  Box,
  Button,
  Input,
  FormControl,
  Stack,
  TextArea,
  Checkbox,
  Select,
  CheckIcon,
  Slider,
  WarningOutlineIcon,
} from 'native-base';
import generateBarcode from '../../api/BarCode/generateBarcode';

const ITF = ({route}) => {
  const [generateQrImage, setGenerateQrImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  const [textAlign, setTextAlign] = useState('center');
  const [textPosition, setTextPosition] = useState('bottom');
  const [textMargin, setTextMargin] = useState(2);
  const [fontSize, setFontSize] = useState(20);
  const [font, setFont] = useState('monospace');
  const [height, setHeight] = useState(50);
  const [veri, setVeri] = useState('');
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
      veri,
      type: 'ITF',
      lineColor: dark,
      background: light,
      displayValue,
      text: veri,
      textAlign,
      textPosition,
      textMargin,
      fontSize,
      font,
      height,
    };
    generateBarcode(data).then(res => {
      if (res.success) {
        setGenerateQrImage(res.base64);
        console.log(res);
        setIsModalVisible(true);
      }
    });
  };
  return (
    <View>
      <FormControl w="100%" style={styles.form} isInvalid>
        <FormControl.Label>
          {route.params.navigator} (Türkçe Karakter Belirtilmez.)
        </FormControl.Label>
        <Input
          placeholder="Bir değer giriniz."
          keyboardType="numeric"
          onChangeText={e => setVeri(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
        {veri.length % 2 !== 0 ? (
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            ITF tipinde barkod oluşturmak için karakter sayısı çift
            olmalıdır.
          </FormControl.ErrorMessage>
        ) : null}
      </FormControl>

      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Yazı Konumu</FormControl.Label>
        <Select
          selectedValue={textAlign}
          minWidth="200"
          placeholder="Yazı Konumunu Seçiniz"
          _selectedItem={{
            bg: 'orange.300',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setTextAlign(itemValue)}>
          <Select.Item label="Sola Yasla" value="left" />
          <Select.Item label="Ortala" value="center" />
          <Select.Item label="Sağa Yasla" value="right" />
        </Select>
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Yazı Düzeni</FormControl.Label>
        <Select
          selectedValue={textPosition}
          minWidth="200"
          placeholder="Yazı Düzenini Seçiniz"
          _selectedItem={{
            bg: 'orange.300',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setTextPosition(itemValue)}>
          <Select.Item label="Altta" value="bottom" />
          <Select.Item label="Üstte" value="top" />
        </Select>
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>
          Yazı Boşluğu ( Yazı ile Barkod arasındaki boşluk )
        </FormControl.Label>
        <Slider
          defaultValue={textMargin}
          colorScheme="orange"
          onChange={e => setTextMargin(e)}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Yazı Boyutu </FormControl.Label>
        <Slider
          defaultValue={fontSize}
          colorScheme="orange"
          onChange={e => setFontSize(e)}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Barkod Yüksekliği </FormControl.Label>
        <Slider
          defaultValue={height}
          colorScheme="orange"
          maxValue={200}
          onChange={e => setHeight(e)}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Yazı Fontu</FormControl.Label>
        <Select
          selectedValue={font}
          minWidth="200"
          placeholder="Yazı Fontunu Seçiniz"
          _selectedItem={{
            bg: 'orange.300',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setFont(itemValue)}>
          <Select.Item label="Monospace" value="monospace" />
          <Select.Item label="Sans-serif" value="sans-serif" />
          <Select.Item label="Serif" value="serif" />
          <Select.Item label="Fantasy" value="fantasy" />
          <Select.Item label="Cursive" value="cursive" />
        </Select>
      </FormControl>
      <FormControl w="100%" style={[styles.form, {flexDirection: 'row'}]}>
        <FormControl.Label>Yazı görünsün mü ?</FormControl.Label>
        <Checkbox
          value={displayValue}
          accessibilityLabel="This is a dummy checkbox"
          onChange={e => setDisplayValue(e)}
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
          Barkod Oluştur
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
                    Barkod Başarıyla Oluşturuldu
                  </Text>
                  <View style={styles.downloadView}>
                    <Image
                      resizeMode="stretch"
                      source={{uri: `${generateQrImage}`}}
                      style={[styles.qrImage, {height}]}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.download}
                    onPress={() => handleDownload()}>
                    <Image
                      source={require('../../assets/images/download.png')}
                      style={{width: 20, height: 20, tintColor: '#565656'}}
                    />
                    <Text style={styles.downloadText}>Barkodu İndir</Text>
                  </TouchableOpacity>
                </View>
              </>
            ): null)}
        </View>
      </Modal>
    </View>
  );
};

export default ITF;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  qrImage: {
    width: 290,
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
