import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";

import { useState } from "react";

import { TouchableOpacity } from "react-native";

import { ScreenHeader } from "../Components/ScreenHeader";
import { UserPhoto } from "../Components/UserPhoto";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const PHOTO_SIZE = 33;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil do Usuário" />
      <ScrollView>
        <Center mt={6} px={10}>
          {isPhotoLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/ViniciusdePSouza.png" }}
              size={PHOTO_SIZE}
              alt="Foto do usuário"
            />
          )}

          <TouchableOpacity>
            <Text
              color="yellow.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="vinitoddy@icloud.com" bg="gray.600" isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Input bg='gray.600' placeholder="Senha Antiga" secureTextEntry/>
          <Input bg='gray.600' placeholder="Nova Senha" secureTextEntry/>
          <Input bg='gray.600' placeholder="Confirme Nova Senha" secureTextEntry/>

          <Button title='Atualizar' mb={4}/>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
