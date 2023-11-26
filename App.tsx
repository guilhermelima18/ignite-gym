import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { theme } from "@styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "@components/loading";
import { Routes } from "@routes/index";
import { AppContext } from "@contexts/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppContext>{fontsLoaded ? <Routes /> : <Loading />}</AppContext>
    </NativeBaseProvider>
  );
}
