import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, FormControl, Input, Stack} from 'native-base';

const ApplicationQr = () => {
  return (
    <View>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>
          İnternet Adresi (Google Play veya Apple Store Linki)
        </FormControl.Label>
        <Input
          placeholder="İnternet Adresini giriniz"
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

export default ApplicationQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
