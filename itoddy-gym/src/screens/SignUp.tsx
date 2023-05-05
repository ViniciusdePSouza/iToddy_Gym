import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import BackgroundImg from "@assets/background.png";

import LogoSvg from "@assets/logo.svg";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

import { useNavigation } from "@react-navigation/native";

import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

type FormDataSchema = {
  name: string;
  email: string;
  password: string;
  passwordConfirmed: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o email").email("Email inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  passwordConfirmed: yup
    .string()
    .required("Confirme a senha")
    .oneOf(
      [yup.ref('password')],
      "A senha de confirmação não bate com a senha informada"
    ),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataSchema>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp(data: FormDataSchema) {
    console.log(data);
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
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Nome"
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
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirmed"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.passwordConfirmed?.message}
              />
            )}
          />
        </Center>
        <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={32}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
