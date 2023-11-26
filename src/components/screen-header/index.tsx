import { Center, Heading } from "native-base";

type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  return (
    <Center bg="gray.600" pb={6} pt={16} mb={3}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
};
