import { Center, Text, VStack } from "native-base";
import { HomeHeader } from "../Components/HomeHeader";

export function Home() {
    return (
        <VStack flex={1}>
            <HomeHeader/>
        </VStack>
    )
}