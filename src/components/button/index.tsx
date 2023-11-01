import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
}

export const Button = ({ title, variant = "solid", ...rest }: ButtonProps) => {
  return (
    <ButtonNativeBase
      bgColor={variant === "outline" ? "transparent" : "green.700"}
      width="full"
      height={14}
      borderWidth={variant === "outline" ? 1 : 0}
      borderColor={variant === "outline" ? "green.500" : "transparent"}
      rounded="sm"
      _pressed={{
        bgColor: variant === "outline" ? "gray.500" : "green.500",
      }}
      {...rest}
    >
      <Text
        color={variant === "outline" ? "green.500" : "white"}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
