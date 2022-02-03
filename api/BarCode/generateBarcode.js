import axios from 'axios';
import config from '../../config';

const generateBarcode = async barcodeData => {
  var request = await axios.post(config.backendURL + '/barcode', barcodeData);
  var res = request.data;
  return res;
};

export default generateBarcode;
