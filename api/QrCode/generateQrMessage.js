import axios from 'axios';
import config from '../../config';

const generateQrMessage = async qrData => {
  var request = await axios.post(
    config.backendURL + '/generate/message',
    qrData,
  );
  var res = request.data;
  return res;
};

export default generateQrMessage;
