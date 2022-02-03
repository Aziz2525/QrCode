import axios from 'axios';
import config from '../../config';

const generateQrPhone = async qrData => {
  var request = await axios.post(config.backendURL + '/generate/phone', qrData);
  var res = request.data;
  return res;
};

export default generateQrPhone;
