import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

type ButtonProps = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg="yellow.700"
      {...rest}
      rounded="sm"
      _pressed={{
        bg: "yellow.500",
      }}
    >
      <Text color="white" fontSize="sm" fontFamily="heading">
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
