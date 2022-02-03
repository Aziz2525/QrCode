import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../config';
const generateQrVcard = async qrData => {
  var request = await axios.post(config.backendURL + '/generate/vcard',qrData);
  var res = request.data;
//   await AsyncStorage.setItem('bgColor', res.bgColor);
  return res;
};

export default generateQrVcard;
