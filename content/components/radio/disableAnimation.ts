const App = `import { Radio } from "@nextui-org/react";

export default function App() {
  return (
    <Radio.Group label="Options" defaultValue="1">
      <Radio value="1" disableAnimation>Option 1</Radio>
      <Radio value="2" disableAnimation>Option 2</Radio>
      <Radio value="3" disableAnimation>Option 3</Radio>
      <Radio value="4" disableAnimation>Option 4</Radio>
    </Radio.Group>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
