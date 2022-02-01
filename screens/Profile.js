import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}>
      <Text style={styles.generateText}>Oluşturulanlar</Text>
      <Text style={styles.historyText}>Geçmiş Taramalar</Text>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    backgroundColor: 'white',
  },
  generateText: {
    fontSize: 20,
    color: '#414141',
    fontFamily: 'Nunito-Bold',
  },
  historyText: {
    fontSize: 20,
    color: '#414141',
    fontFamily: 'Nunito-Bold',
  },
});
