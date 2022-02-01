import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Button,
  FormControl,
  Input,
  Stack,
} from 'native-base';

const EmailQr = () => {
  return (
    <View >
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Emailinizi giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Konu</FormControl.Label>
        <Input
          placeholder="Konu giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Mesaj</FormControl.Label>
        <Input
          placeholder="Mesaj giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <Stack space={14} style={{alignItems: 'flex-end'}}>
        <Button
          _text={{
            color: 'white',
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 15,
            fontWeight: 'bold',
          }}
          style={{
            backgroundColor: 'orange',
            color: 'white',
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 20,
            marginBottom: 30,
          }}>
          QR Oluştur
        </Button>
      </Stack>
    </View>
  );
};

export default EmailQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
