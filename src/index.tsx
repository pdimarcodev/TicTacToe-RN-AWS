import React, { ReactElement } from "react";
import Navigator from "@config/Navigator";
import { AppBootstrap } from "@components";
import { SettingsProvider } from "@contexts/settings-context";

export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </AppBootstrap>
  );
}
