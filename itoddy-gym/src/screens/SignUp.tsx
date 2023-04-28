import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base";

import BackgroundImg from "@assets/background.png";

import LogoSvg from "@assets/logo.svg";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
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

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry />
        </Center>
        <Button title="Criar e acessar" />

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
