import { Center, Heading, Text, VStack, SectionList, useToast } from "native-base";

import { ScreenHeader } from "../Components/ScreenHeader";
import { HistoryCard } from "../Components/HistoryCard";

import { useCallback, useState } from "react";

import { useFocusEffect } from "@react-navigation/native";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, SetExercises] = useState<HistoryByDayDTO []>([]);

  const toast = useToast()

  async function fetchHistory() {
    try {
      setIsLoading(true)

      const response = await api.get('history')
      SetExercises(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally{
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard history={item} />}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontFamily='heading' fontSize='md' mt={10} mb={3}>{section.title}</Heading>
        )}
       px={6}
       contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: 'center'}}
       ListEmptyComponent={() => (
        <Text color='gray.100' textAlign='center'>Não há exercícios registrados ainda.</Text>
       )}
      />

    </VStack>
  );
}
