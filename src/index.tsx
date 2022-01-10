import React, { ReactElement } from "react";
import Navigator from "@config/Navigator";
import { AppBootstrap } from "@components";
import { SettingsProvider } from "@contexts/settings-context";
import Amplify from "aws-amplify";
import config from "../aws-exports";
import { AuthProvider } from "@contexts/auth-context";

Amplify.configure(config);

export default function App(): ReactElement {
  return (
    <AuthProvider>
      <AppBootstrap>
        <SettingsProvider>
          <Navigator />
        </SettingsProvider>
      </AppBootstrap>
    </AuthProvider>
  );
}
