import { Pressable, Text, IPressableProps } from "native-base";

type GroupProps = IPressableProps & {
  name: string;
  isActive: boolean;
};

export const Group = ({ name, isActive, ...rest }: GroupProps) => {
  return (
    <Pressable
      bgColor="gray.600"
      width={24}
      height={10}
      mr={3}
      rounded="md"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1,
      }}
      {...rest}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
};
