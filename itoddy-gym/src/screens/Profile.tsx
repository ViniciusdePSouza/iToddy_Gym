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

import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type FormDataProps = {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmationNewPassword: string;
};

const profileFormSchema = yup.object({
  name: yup.string().required("Insira o nome que deseja usar no app"),
  email: yup.string().required("Insira o email que deseja usar no app").email(),
  newPassword: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirmationNewPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword")],
      "A senha de confirmação não bate com a senha informada"
    )
    .nullable()
    .transform((value) => (!!value ? value : null))
    .when("newPassword", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("A confirmação da senha é necessária")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/ViniciusdePSouza.png"
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const { user, updateUserProfile } = useAuth();

  const PHOTO_SIZE = 33;

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  async function handleProfileInfoUpdate(data: FormDataProps) {
    try {
      const userUpdated = {
        name: data.name,
        password: data.newPassword,
        old_password: data.oldPassword,
      };

      const userUpdatedInContext = user;

      userUpdatedInContext.name = userUpdated.name;

      setIsUpdating(true);

      await api.put("/users", userUpdated);
      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "yellow.700",
      });

      await updateUserProfile(userUpdatedInContext);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível atualizar o perfi, tente novamente mais tarde";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsUpdating(false);
    }
  }

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
        const photoInfo = await FileSystem.getInfoAsync(
          userPhotoSelected.assets[0].uri
        );

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Imagem muito grande, selecione uma menor",
            placement: "top",
            bgColor: "red.500",
          });
        }

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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="vinitoddy@icloud.com"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                isDisabled
              />
            )}
          />
        </Center>

        <VStack px={10} mt={12} mb={9}>
          <Heading color="gray.200" fontSize="md" mb={2}>
            Alterar Senha
          </Heading>

          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha Antiga"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmationNewPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme Nova Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.confirmationNewPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mb={4}
            onPress={handleSubmit(handleProfileInfoUpdate)}
            isLoading={isUpdating}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
