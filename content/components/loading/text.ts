const App = `import { Loading } from "@nextui-org/react";

export default function App() {
  return <Loading>Loading</Loading>;
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
