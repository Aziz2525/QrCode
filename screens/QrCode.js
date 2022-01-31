import { ScrollView, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React from 'react';


const QrCode = () => {
    const barcodeItems = [
        {
            id: 1,
            image: require("../assets/images/meCard.png"),
            width: 35,
            height: 35,
            text: "MeCard",
            navigator: "MeCard"
        },
        {
            id: 1,
            image: require("../assets/images/message.png"),
            width: 35,
            height: 35,
            text: "Mesaj",
            navigator: "Message"
        },
        {
            id: 1,
            image: require("../assets/images/email.png"),
            width: 35,
            height: 35,
            text: "Email",
            navigator: "Email"
        }
        ,
        {
            id: 1,
            image: require("../assets/images/text.png"),
            width: 35,
            height: 35,
            text: "Text",
            navigator: "Text"
        }
        ,
        {
            id: 1,
            image: require("../assets/images/telephone.png"),
            width: 35,
            height: 35,
            text: "Telefon",
            navigator: "Phone"
        }
        ,
        {
            id: 1,
            image: require("../assets/images/unlink.png"),
            width: 35,
            height: 35,
            text: "Link",
            navigator: "Link"
        },



    ]
    return (
        <View style={styles.container}>
            <View style={styles.searchView}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchInput} placeholder='Ara...' />
                    <Image source={require('../assets/images/search.png')} style={styles.searchImg} />
                </View>
            </View>
            <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: 'white' }}>
                <View style={styles.barcodeItems}>
                    {barcodeItems.map((data, index) => {
                        return (
                            <View style={styles.cardView}>
                                <Image source={data.image} style={{ width: data.width, height: data.height }} />
                                <Text style={styles.cardText}>{data.text}</Text>
                            </View>
                        )
                    })}
                </View>
               
            </ScrollView>
        </View>
    );
};

export default QrCode;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    searchBar: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 300,

    },
    searchView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    searchInput: {
        width: '85%',
        fontFamily: "Nunito-Bold"
    },
    searchImg: {
        width: 15,
        height: 15,
        tintColor: 'gray',
    },
    barcodeItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    cardView: {
        borderRadius: 5,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingTop: 20,
        paddingBottom: 20
    },
    cardText: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "Nunito-Bold"
    }
});
