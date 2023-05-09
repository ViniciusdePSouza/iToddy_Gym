import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type ExerciseCardProps = TouchableOpacityProps & {
  exerciseData: ExerciseDTO
};

export function ExerciseCard({ exerciseData, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg='gray.500' alignItems='center' p={2} pr={4} rounded='md' mb={3}>
        <Image
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${exerciseData.thumb}`,
          }}
          alt="Imagem do exercício"
          w={16}
          h={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily='heading'>
          {exerciseData.name}
          </Heading>

          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {exerciseData.series} séries x {exerciseData.repetitions} repetições
          </Text>
        </VStack>

        <Icon as={Entypo} name='chevron-thin-right' color='gray.300'/>
      </HStack>
    </TouchableOpacity>
  );
}
