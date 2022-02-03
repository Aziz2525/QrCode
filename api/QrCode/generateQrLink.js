import axios from 'axios';
import config from '../../config';

const generateQrLink = async qrData => {
  var request = await axios.post(config.backendURL + '/generate/link', qrData);
  var res = request.data;
  return res;
};

export default generateQrLink;
