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

const Intro = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width, height} = Dimensions.get('window');

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
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={event => {
            setSliderPage(event);
          }}>
          <View style={{width, height}}>
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
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text style={styles.paragraph}>....something like that</Text>
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
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>
                ... for a fraction of the price
              </Text>
            </View>
          </View>
          <View style={{width, height}}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/ti/vetor-gratis/p3/1214444-smartphone-qr-code-scan-vetor.jpg',
              }}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
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
          {Array.from(Array(3).keys()).map((key, index) => (
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
  },
  paragraph: {
    fontSize: 17,
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
