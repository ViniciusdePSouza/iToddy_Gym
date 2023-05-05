import { Center, Heading, Text, VStack, SectionList } from "native-base";

import { ScreenHeader } from "../Components/ScreenHeader";
import { HistoryCard } from "../Components/HistoryCard";
import { useState } from "react";

export function History() {
  const [exercises, SetExercises] = useState([
    {
      title: "04/05/2023",
      data: ["Puxada Frontal", "Remada Unilateral"],
    },
    {
      title: "07/05/2023",
      data: ["Puxada Frontal"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
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
