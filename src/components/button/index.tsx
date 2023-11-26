import {
  Button as ButtonNativeBase,
  IButtonProps,
  Text,
  Spinner,
} from "native-base";

interface ButtonProps extends IButtonProps {
  title: string;
  variant?: "solid" | "outline";
  loading?: boolean;
}

export const Button = ({
  title,
  variant = "solid",
  loading,
  ...rest
}: ButtonProps) => {
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
      {loading ? (
        <Spinner size="sm" color="white" />
      ) : (
        <Text
          color={variant === "outline" ? "green.500" : "white"}
          fontFamily="heading"
          fontSize="sm"
        >
          {title}
        </Text>
      )}
    </ButtonNativeBase>
  );
};
