import { Pressable, Text, IPressableProps } from "native-base";

type GroupProps = IPressableProps & {
  name: string;
};

export const Group = ({ name, ...rest }: GroupProps) => {
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
      {...rest}
    >
      <Text
        color="gray.200"
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  );
};
