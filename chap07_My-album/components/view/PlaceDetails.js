import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../model/Colors";

const PlaceDetails = ({route, navigation}) =>{

    const [fetchedPlace, setFetchedPlace] = useState();

    const showOnMapHandler = () => {
        navigation.navigation("Map", {
            latitude : fetchedPlace.location.lat,
            longitude : fetchedPlace.location.lng
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        const loadPlaceData = async() => {
            const result = await fetchedPlaceDetails(selectedPlaceId);

            setFetchedPlace(result);
            navigation.setOptions({title: result.title});
        }

        loadPlaceData();
    }, [selectedPlaceId]);

    if(!fetchedPlace){
        return(
            <View style={styles.fallback}>
                <Text>로딩 중입니다</Text>
            </View>
        )
    }

    return(
        <ScrollView>
            <Image style={styles.image} source={{uri:fetchedPlace.imageUri}}/>
            <View style={styles.locationContainer}>
                <Text style={styles.address}>{fetchedPlace.address}</Text>
            </View>
            <OutlineButton icon="Map" onPress={showOnMapHandler}>
                지도 보기
            </OutlineButton>
        </ScrollView>
    )
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screen: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
});