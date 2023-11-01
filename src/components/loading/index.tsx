import { Flex, Spinner } from "native-base";

interface LoadingProps {
  size?: "sm" | "lg";
}

export const Loading = ({ size = "lg" }: LoadingProps) => {
  return (
    <Flex
      bgColor="gray.700"
      width="100%"
      height="100%"
      flexDir="row"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size={size} color="green.500" />
    </Flex>
  );
};
