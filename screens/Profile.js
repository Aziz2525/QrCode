import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Profile = () => {
  const adsRemove = () => {
    alert('İlanınız silindi.');
  };
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      style={styles.container}>
      <Text style={styles.generateText}>Oluşturulanlar</Text>
      <Text style={styles.historyText}>Geçmiş Taramalar</Text>
      <TouchableOpacity style={styles.removeAds} onPress={()=>adsRemove()}><Text style={styles.removeAdsText}>Reklamları Kaldır</Text></TouchableOpacity>
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
  removeAds:{
    backgroundColor: '#F72222',
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5
  },
  removeAdsText:{
    fontFamily:'Nunito-Bold',
    color:'white'
  }
});
