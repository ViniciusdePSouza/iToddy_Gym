import {
  Button as ButtonNativeBase,
  Center,
  IButtonProps,
  Text,
} from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: 'solid' | 'outline'
};

export function Button({ variant = 'solid', title, ...rest }: ButtonProps) {
  return (
    <Center>
      <ButtonNativeBase
        w="full"
        h={14}
        bg={variant === "outline" ? "transparent" : "yellow.700"}
        borderWidth={variant === "outline" ? 1 : 0}
        borderColor="yellow.500"
        {...rest}
        rounded="sm"
        _pressed={{
          bg: variant === "outline" ? "gray.500" : "yellow.500",
        }}
        mb={5}
      >
        <Text
          color={variant === "outline" ? "yellow.500" : "white"}
          fontSize="sm"
          fontFamily="heading"
        >
          {title}
        </Text>
      </ButtonNativeBase>
    </Center>
  );
}
