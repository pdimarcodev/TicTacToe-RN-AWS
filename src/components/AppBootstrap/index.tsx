import React, { ReactElement, ReactNode } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";

interface AppBootstrapProps {
  children: ReactNode;
}

export default function AppBootstrap({
  children,
}: AppBootstrapProps): ReactElement {
  const [fontLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });
  return fontLoaded ? <>{children}</> : <AppLoading />;
}
