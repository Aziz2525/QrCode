import axios from 'axios';
import config from '../../config';

const generateQrWifi = async qrData => {
  var request = await axios.post(config.backendURL + '/generate/wifi', qrData);
  var res = request.data;
  return res;
};

export default generateQrWifi;
