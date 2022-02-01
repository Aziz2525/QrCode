import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Button,
  FormControl,
  Icon,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';

const MessageQr = () => {
  return (
    <>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Telefon Numarası</FormControl.Label>
        <Input
          placeholder="Telefon numaranızı giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Mesaj</FormControl.Label>
        <Input
          placeholder="Mesajınızı giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <Stack
        direction={{
          base: 'column',
          md: 'row',
        }}
        space={4}>
        <Button
          _text={{color: 'white', fontFamily: 'Nunito-ExtraBold', fontSize: 15}}
          style={{
            backgroundColor: 'orange',
            color: 'white',
            fontFamily: 'Nunito-ExtraBold',
            fontSize: 20,
            marginBottom: 30,
          }}>
          Mesaj QR Kodu Oluştur
        </Button>
      </Stack>
    </>
  );
};

export default MessageQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
