import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, FormControl, Input, Radio, Stack} from 'native-base';

const BitcoinQr = () => {
  const [value, setValue] = React.useState('one');
  return (
    <View>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Miktar</FormControl.Label>
        <Input
          placeholder="Miktar giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Alıcı</FormControl.Label>
        <Input
          placeholder="Alıcı Giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Mesaj (zorunlu değil)</FormControl.Label>
        <Input
          placeholder="Mesaj Giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <Stack
        style={{alignItems: 'flex-end'}}
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
          QR Oluştur
        </Button>
      </Stack>
    </View>
  );
};

export default BitcoinQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
