import { View, Text } from "react-native"

const ViewComponent = ({isTrue, styles}) => {

    if(isTrue){
        return <View>
            에러 발생
        </View>
    }

    return(
        <View style={styles}>
            <Text>i'm 썬다람쥐</Text>
        </View>
    )
}

export default ViewComponent;