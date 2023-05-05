import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useState } from "react";

import { TouchableOpacity } from "react-native";

import { ScreenHeader } from "../Components/ScreenHeader";
import { UserPhoto } from "../Components/UserPhoto";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/ViniciusdePSouza.png"
  );
  const PHOTO_SIZE = 33;

  const toast = useToast()

  async function handleSelectUserPhoto() {
    setIsPhotoLoading(true);
    try {
      const userPhotoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (userPhotoSelected.canceled) {
        return;
      }

      if (userPhotoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(userPhotoSelected.assets[0].uri)
        
        if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 5) {
          return toast.show({
            title: 'Imagem muito grande, selecione uma menor',
            placement: 'top',
            bgColor: 'red.500'
          })
        };

        setUserPhoto(userPhotoSelected.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPhotoLoading(false);
    }
  }

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
              startColor="gray.400"
              endColor="gray.300"
            />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
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
              onPress={handleSelectUserPhoto}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="vinitoddy@icloud.com" bg="gray.600" isDisabled />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200"  fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Input bg="gray.600" placeholder="Senha Antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova Senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme Nova Senha"
            secureTextEntry
          />

          <Button title="Atualizar" mb={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
