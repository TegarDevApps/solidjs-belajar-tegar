import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";
import App from "./App";
import './styles/index.css';

render(() => (
  <HopeProvider resetCSS={false}>
    <App />
  </HopeProvider>
), document.getElementById("root")!);