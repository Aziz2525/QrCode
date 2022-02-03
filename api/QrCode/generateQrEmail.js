import axios from 'axios';
import config from '../../config';

const generateQrEmail = async qrData => {
  var request = await axios.post(config.backendURL + '/generate/email', qrData);
  var res = request.data;
  return res;
};

export default generateQrEmail;
