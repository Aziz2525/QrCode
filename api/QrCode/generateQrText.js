import axios from 'axios';
import config from '../../config';

const generateQrText = async qrData => {
  var request = await axios.post(config.backendURL + '/generate',qrData);
  var res = request.data;
  return res;
};

export default generateQrText;
