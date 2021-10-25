import React, { ReactElement } from "react";
import Navigator from "@config/Navigator";
import { AppBootstrap } from "@components";

export default function App(): ReactElement {
  return (
    <AppBootstrap>
      <Navigator />
    </AppBootstrap>
  );
}
