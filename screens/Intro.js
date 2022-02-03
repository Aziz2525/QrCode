import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import AuthContext from '../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppearanceProvider,
  Appearance,
  useColorScheme,
} from 'react-native-appearance';

const Intro = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width, height} = Dimensions.get('window');
  const scheme = useColorScheme();
  const setSliderPage = event => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };
  const HomeFunc = async () => {
    await AsyncStorage.setItem('intro', JSON.stringify({intro: true}));
    signIn({intro: true});
    navigation.push('Home');
  };
  const {currentPage: pageIndex} = sliderState;

  return (
    <>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: scheme === 'dark' ? 'rgb(18,18,18)' : 'white',
        }}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={event => {
            setSliderPage(event);
          }}>
          <View style={{width, height, alignItems: 'center'}}>
            <LottieView
              source={require('../assets/lottie/animation.json')}
              autoPlay
              loop
              style={styles.imageStyle}
            />
            {/* <Image
              source={{
                uri: 'https://i0.wp.com/www.karekod.org/blog/wp-content/uploads/2020/11/qr-code.jpg?fit=820%2C820&ssl=1',
              }}
              style={styles.imageStyle}
            /> */}
            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.header,
                  {color: scheme === 'dark' ? 'white' : 'rgb(18,18,18)'},
                ]}>
                Kolayca QrCode ve Barcode Okutun.
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {color: scheme === 'dark' ? 'white' : 'rgb(18,18,18)'},
                ]}>
                Oluşturulan Qr kodlari ve Barkodları hızlıca okutup işlem yapabilirsiniz.
              </Text>
            </View>
          </View>
          <View style={{width, height}}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/736x/53/8a/68/538a6806ede4a078ce774b3a4bcb5973.jpg',
              }}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.header,
                  {color: scheme === 'dark' ? 'white' : 'rgb(18,18,18)'},
                ]}>
                Yüksek kaliteli Qr kodlar oluşturun.
              </Text>
              <Text
                style={[
                  styles.paragraph,
                  {color: scheme === 'dark' ? 'white' : 'rgb(18,18,18)'},
                ]}>
                Oluşturduğunuz yüksek kaliteli Qr veya Barkodları hızlıca telefonunuza indirin.
              </Text>
            </View>
          </View>
         
        </ScrollView>
        <View style={styles.skipView}>
          <View style={styles.skipStep}></View>
          <View style={styles.skipStep}></View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => HomeFunc()}
            style={styles.skip}>
            <Text style={styles.skipText}>GEÇ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paginationWrapper}>
          {Array.from(Array(2).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: pageIndex === index ? 1 : 0.2},
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:'center'

  },
  paragraph: {
    fontSize: 17,
    textAlign:'center'
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#0898A0',
    marginLeft: 10,
  },
  skipView: {
    flexDirection: 'row',
    width: '100%',
  },
  skipStep: {
    width: '35%',
  },
  skip: {
    backgroundColor: '#0898A0',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  skipText: {
    fontWeight: '700',
    color: 'white',
  },
});

export default Intro;
