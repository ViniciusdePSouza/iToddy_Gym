import { HStack, VStack, Heading, Text } from "native-base";

export function HistoryCard() {
    return (
        <HStack w='full' px={5} py={4} mb={3} bg='gray.600' rounded='md' alignItems='center' justifyContent='space-between'>
            <VStack>
                <Heading color='white' fontSize='md' textTransform='capitalize'>
                    Costas
                </Heading>

                <Text color='gray.100' fontSize='lg' numberOfLines={1}>Puxada Frontal</Text>
            </VStack>

            <Text color='gray.300' fontSize='md'>8:56</Text>
        </HStack>
    )
}