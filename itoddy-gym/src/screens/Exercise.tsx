import {
  HStack,
  Heading,
  Icon,
  VStack,
  Text,
  Image,
  Box,
  ScrollView,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionSVG from "@assets/repetitions.svg";

import { Button } from "../Components/Button";
import { Loading } from "../Components/Loading";

import { useEffect, useState } from "react";

import { api } from "@services/api";

import { CurrentExerciseDTO } from "@dtos/CurrentExercise";

import { AppError } from "@utils/AppError";

type ExerciseRouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const [currentExercise, setCurrentExercise] = useState<CurrentExerciseDTO>(
    {} as CurrentExerciseDTO
  );
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const route = useRoute();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { exerciseId } = route.params as ExerciseRouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseById() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/${exerciseId}`);
      setCurrentExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseById();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={16}>
        <TouchableOpacity>
          <Icon
            as={Feather}
            name="arrow-left"
            color="yellow.500"
            size={6}
            onPress={handleGoBack}
          ></Icon>
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {currentExercise.name}
          </Heading>

          <HStack alignItems="center">
            <BodySVG />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {currentExercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${currentExercise.demo}`,
              }}
              alt="Imagem do exercício"
              mb={3}
              resizeMode="cover"
              rounded="lg"
            />

            <Box bg="gra.600" rounded="md" pb={4} px={4}>
              <HStack
                alignItems="center"
                justifyContent="space-around"
                mb={6}
                mt={5}
              >
                <HStack>
                  <SeriesSVG />
                  <Text color="gray.200" ml="2">
                    {currentExercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionSVG />
                  <Text color="gray.200" ml="2">
                    {currentExercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  );
}
