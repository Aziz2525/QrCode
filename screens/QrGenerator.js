import {ScrollView, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import VCardQr from '../components/VCardQr';
import MessageQr from '../components/MessageQr';
import EmailQr from '../components/EmailQr';

const QrGenerator = ({route}) => {
  console.log(route);
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}>
        {route.params.navigator === 'VCard' ? (
          <VCardQr />
        ) : route.params.navigator === 'Message' ? (
          <MessageQr />
        ) : route.params.navigator === 'Email' ? (
          <EmailQr />
        ) : route.params.navigator === 'Sms' ? (
          <Text style={styles.generateText}>Sms QR Code</Text>
        ) : route.params.navigator === 'Wifi' ? (
          <Text style={styles.generateText}>Wifi QR Code</Text>
        ) : route.params.navigator === 'Link' ? (
          <Text style={styles.generateText}>Link QR Code</Text>
        ) : route.params.navigator === 'Contact' ? (
          <Text style={styles.generateText}>Contact QR Code</Text>
        ) : route.params.navigator === 'Text' ? (
          <Text style={styles.generateText}>Text QR Code</Text>
        ) : route.params.navigator === 'Phone' ? (
          <Text style={styles.generateText}>Phone QR Code</Text>
        ) : route.params.navigator === 'Bitcoin' ? (
          <Text style={styles.generateText}>Bitcoin QR Code</Text>
        ) : route.params.navigator === 'SocialMedia' ? (
          <Text style={styles.generateText}>SocialMedia QR Code</Text>
        ) : route.params.navigator === 'pdf' ? (
          <Text style={styles.generateText}>pdf QR Code</Text>
        ) : route.params.navigator === 'MP3' ? (
          <Text style={styles.generateText}>MP3 QR Code</Text>
        ) : route.params.navigator === 'Application' ? (
          <Text style={styles.generateText}>Application QR Code</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default QrGenerator;

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: 'white',
    padding: 10,
  },
  container: {
    backgroundColor: 'white',
  },
});
