import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
  useToast,
} from "native-base";

import BackgroundImg from "@assets/background.png";

import LogoSvg from "@assets/logo.svg";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Insira o Email").email(),
  password: yup
    .string()
    .required("Insira a senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const toast = useToast();

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
      
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar, tenta novamente mais tarde";

      setIsLoading(false);

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  return (
    <ScrollView
      _contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando bicicleta"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Senha"
                autoCapitalize="none"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </Center>
        <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>

        <Center mt={32} mb={5}>
          <Text color="gray.100" fontSize="sm" fontFamily="body">
            Ainda não tem acesso ?
          </Text>
        </Center>

        <Button
          title="Crie sua Conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  );
}
