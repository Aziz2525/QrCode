import React, {useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ColorPicker} from 'react-native-color-picker';
const {width, height} = Dimensions.get('window');
const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}>
      <View style={styles.inputView}>
        <View style={styles.info}>
          <Text style={styles.infoText}>URL veya Metin</Text>
        </View>
        <View style={styles.inputViewC}>
          <TextInput placeholder="url veya metin yazın." style={styles.input} />
        </View>
      </View>
      <View style={styles.inputView}>
        <View style={styles.info}>
          <Text style={styles.infoText}>Arkaplan rengi</Text>
        </View>
        <View style={[styles.colorBg, {backgroundColor: bgColor}]}>
          <Text style={[styles.infoText, {color: 'black'}]}>
            {bgColor === '#ffffff' ? bgColor + ' (varsayılan)' : bgColor}
          </Text>
        </View>
        <View style={styles.colorBgBtn}>
          <TouchableOpacity
            style={styles.bgSelectBtn}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>Seç</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputView}>
        <View style={styles.info}>
          <Text style={styles.infoText}>QR rengi</Text>
        </View>
        <View style={[styles.colorBg, {backgroundColor: bgColor}]}>
          <Text style={[styles.infoText, {color: 'black'}]}>
            {bgColor === '#ffffff' ? bgColor + ' (varsayılan)' : bgColor}
          </Text>
        </View>
        <View style={styles.colorBgBtn}>
          <TouchableOpacity
            style={styles.bgSelectBtn}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text>Seç</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.hideModalBtn}
          onPress={() => setModalVisible(!modalVisible)}>
          <Image
            source={require('../assets/images/close.png')}
            style={{width: 30, height: 30, tintColor: 'gray'}}
          />
        </Pressable>
        <ColorPicker
          onColorSelected={color => {
            setBgColor(color);
            setModalVisible(!modalVisible);
          }}
          style={{flex: 0.7, padding: 50}}
        />
      </Modal>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 10,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  infoText: {
    fontSize: 12,
    color: '#7D7D7D',
    fontWeight: '700',
  },
  inputViewC: {
    width: '70%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  colorBg: {
    width: '60%',
    height: 30,
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 10,
  },
  colorBgBtn: {
    marginLeft: 5,
    width: '10%',
    height: 30,
  },
  bgSelectBtn: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  hideModalBtn: {
    marginTop: 50,
    marginLeft: 20,
  },
});
