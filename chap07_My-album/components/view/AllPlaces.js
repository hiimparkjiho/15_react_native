import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react"
import PlacesList from "../places/PlacesList";
import { fetchPlaces } from "../../util/Query";


const Allplaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    // 화면에 포커스되는 경우 boolean 타입의 값을 받는 훅스이다.
    const isFocused = useIsFocused();

    useEffect(() => {
        const setupPlaces = async() => {
            const place = await fetchPlaces();
            setLoadedPlaces(place);
        };

        if(isFocused){
            setupPlaces();
        }
    },[isFocused]);
    return (
        <PlacesList places = {loadedPlaces}/>
    )
}

export default Allplaces;