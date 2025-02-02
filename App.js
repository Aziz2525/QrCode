import * as React from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  StyleSheet,
  ScrollView,
  PixelRatio,
} from 'react-native';
import {
  AppearanceProvider,
  Appearance,
  useColorScheme,
} from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LottieView from 'lottie-react-native';
import {NativeBaseProvider} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './components/AuthContext';
import Intro from './screens/Intro';
import Home from './screens/Home';
import QrCode from './screens/QrCode';
import BarCode from './screens/BarCode';
import QrScanner from './screens/QrScanner';
import Profile from './screens/Profile';
import QrGenerator from './screens/QrGenerator';
import {ColorPicker} from 'react-native-color-picker';
import BarCodeGenerator from './screens/BarCodeGenerator';
Appearance.getColorScheme();

function SplashScreen() {
  const scheme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: scheme === 'dark' ? 'rgb(18,18,18)' : 'white',
      }}>
      <LottieView
        source={
          scheme === 'dark'
            ? require('./assets/lottie/darkloading.json')
            : require('./assets/lottie/lightloading.json')
        }
        autoPlay
        loop
        style={styles.imageStyle}
      />
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: 'orange'},
        tabBarLabelStyle: {fontSize: 12},
        tabBarContentContainerStyle: {
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={QrCode}
        options={{
          title: 'Qrcode',
          tabBarLabelStyle: {
            fontFamily: 'Nunito-Regular',
          },
        }}
      />
      <Tab.Screen
        name="Barcode"
        component={BarCode}
        options={{
          title: 'Barcode',
          tabBarLabelStyle: {
            fontFamily: 'Nunito-Medium',
          },
        }}
      />
    </Tab.Navigator>
  );
}
export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );
  const colorScheme = useColorScheme();
  const {dark, colors} = useTheme();
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      console.log(DarkTheme);
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await AsyncStorage.getItem('intro');
        // await AsyncStorage.removeItem('intro');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setTimeout(() => {
        dispatch({type: 'RESTORE_TOKEN', token: userToken});
      }, 3000);
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <AppearanceProvider>
        <NativeBaseProvider>
          <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
              {state.isLoading ? (
                // We haven't finished checking for the token yet
                <Stack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{
                    headerShown: false,
                    animationEnabled: false,
                  }}
                />
              ) : state.userToken == null ? (
                // No token found, user isn't signed in
                <Stack.Screen
                  name="Intro"
                  component={Intro}
                  options={{
                    headerShown: false,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
              ) : (
                // User is signed in
                <>
                  <Stack.Screen
                    name="Home"
                    component={MyTabs}
                    options={({route, navigation}) => ({
                      title: 'OLUŞTUR',
                      animationEnabled: false,
                      headerTitleStyle: {
                        fontFamily: 'Nunito-ExtraBold',
                      },
                      headerRight: () => {
                        return (
                          <TouchableOpacity
                            style={{marginRight: 20}}
                            onPress={() => navigation.push('QrScanner')}>
                            <Image
                              source={require('./assets/images/barcode-scan.png')}
                              style={{
                                width: 25,
                                height: 25,
                                tintColor:
                                  colorScheme === 'dark' ? 'white' : '#424141',
                              }}
                            />
                          </TouchableOpacity>
                        );
                      },
                      // headerLeft: () => {
                      //   return (
                      //     <TouchableOpacity
                      //       style={{marginLeft: 20}}
                      //       onPress={() => navigation.push('Profile')}>
                      //       <Image
                      //         source={require('./assets/images/user.png')}
                      //         style={{
                      //           width: 20,
                      //           height: 20,
                      //           tintColor:
                      //             colorScheme === 'dark' ? 'white' : '#424141',
                      //         }}
                      //       />
                      //     </TouchableOpacity>
                      //   );
                      // },
                    })}
                  />
                  <Stack.Screen
                    name="QrScanner"
                    component={QrScanner}
                    options={{
                      title: 'OLUŞTUR',
                      headerTitleStyle: {
                        fontFamily: 'Nunito-ExtraBold',
                        color: colorScheme === 'dark' ? 'white' : '#424141',
                      },
                      headerBackTitle: 'Geri',
                      headerBackTitleStyle: {color: 'orange'},
                      headerTintColor: 'orange',
                      headerTitle: 'Qrcode Tara',
                      ...TransitionPresets.ModalPresentationIOS,
                    }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                      title: 'OLUŞTUR',
                      headerTitleStyle: {
                        fontFamily: 'Nunito-ExtraBold',
                        color: colorScheme === 'dark' ? 'white' : '#424141',
                      },
                      headerBackTitle: 'Geri',
                      headerBackTitleStyle: {color: 'orange'},
                      headerTintColor: 'orange',
                      headerTitle: 'Profilim',
                    }}
                  />
                  <Stack.Screen
                    name="QrGenerator"
                    component={QrGenerator}
                    options={({route, navigation}) => ({
                      title: route.params.name + ' Oluştur',
                      headerTitleStyle: {
                        fontFamily: 'Nunito-ExtraBold',
                        color: colorScheme === 'dark' ? 'white' : '#424141',
                      },

                      headerBackTitle: 'Geri',
                      headerBackTitleStyle: {color: 'orange'},
                      headerTintColor: 'orange',
                    })}
                  />
                  <Stack.Screen
                    name="BarcodeGenerator"
                    component={BarCodeGenerator}
                    options={({route, navigation}) => ({
                      title: route.params.name + ' Oluştur',
                      headerTitleStyle: {
                        fontFamily: 'Nunito-ExtraBold',
                        color: colorScheme === 'dark' ? 'white' : '#424141',
                      },

                      headerBackTitle: 'Geri',
                      headerBackTitleStyle: {color: 'orange'},
                      headerTintColor: 'orange',
                    })}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </AppearanceProvider>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: '100%',
  },
});
