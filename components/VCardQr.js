import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import {
  Button,
  FormControl,
  Icon,
  Input,
  Stack,
  WarningOutlineIcon,
} from 'native-base';
const VCardQr = () => {
  return (
    <>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Adınız</FormControl.Label>
        <Input
          placeholder="Adınızı giriniz"
          onChangeText={e => console.log(e)}
          variant="underlined"
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Soyadınız</FormControl.Label>
        <Input
          placeholder="Soyadınızı giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          placeholder="Email giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Telefon</FormControl.Label>
        <Input
          placeholder="Telefon numaranızı giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Cep Telefonu</FormControl.Label>
        <Input
          placeholder="Cep Telefonunuzu giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Faks</FormControl.Label>
        <Input
          placeholder="Faks giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>İnternet Adresi</FormControl.Label>
        <Input
          placeholder="İnternet Adresinizi giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Şirket Bilgileri</FormControl.Label>
        <Input
          placeholder="Şirketinizi giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
        />
        <Input
          placeholder="İş Pozisyonunuzu giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
      </FormControl>
      <FormControl w="100%" style={styles.form}>
        <FormControl.Label>Adres Bilgileri</FormControl.Label>
        <Input
          placeholder="Ülkenizi giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
        />
        <Input
          placeholder="Şehrinizi giriniz"
          variant="underlined"
          onChangeText={e => console.log(e)}
          style={{marginBottom: 10}}
          _focus={{borderColor: '#FFA500'}}
        />
        <Input
          placeholder="Sokağınızı giriniz"
          variant="underlined"
          style={{marginBottom: 10}}
          onChangeText={e => console.log(e)}
          _focus={{borderColor: '#FFA500'}}
        />
        <Input
          placeholder="Zip kodunuzu giriniz"
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
    </>
  );
};

export default VCardQr;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
});
