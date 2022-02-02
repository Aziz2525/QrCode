import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, FormControl, Input, Radio, Stack} from 'native-base';

const WifiQr = () => {
  const [value, setValue] = React.useState('one');
  return (
    <View>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Network İsmi</FormControl.Label>
        <Input
          placeholder="Network ismini giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Şifre</FormControl.Label>
        <Input
          placeholder="Şifre"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Şifreleme / Encryption</FormControl.Label>
        <Radio.Group
          name="myRadioGroup"
          value={value}
          colorScheme="secondary"
          onChange={nextValue => {
            setValue(nextValue);
          }}>
          <Radio value="None" my="1" style>
            None
          </Radio>
          <Radio value="WPA/WPA2" my="1">
            WPA/WPA2
          </Radio>
          <Radio value="WEP" my="1">
            WEP
          </Radio>
        </Radio.Group>
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

export default WifiQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
