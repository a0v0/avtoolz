const App = `import { Tooltip, Button, Grid } from "@nextui-org/react";

export default function App() {
  return (
    <Grid.Container gap={2}>
      <Grid>
        <Tooltip content="Developers love Next.js">
          <Button light auto>
            Default
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content="Developers love Next.js"
          contentColor="primary"
          color="white"
        >
          <Button flat auto>
            Primary
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content="Developers love Next.js"
          contentColor="secondary"
          color="white"
        >
          <Button flat auto color="secondary">
            Secondary
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content="Developers love Next.js"
          contentColor="success"
          color="white"
        >
          <Button flat auto color="success">
            Success
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content="Developers love Next.js"
          contentColor="warning"
          color="white"
        >
          <Button flat auto color="warning">
            Warning
          </Button>
        </Tooltip>
      </Grid>
      <Grid>
        <Tooltip
          content="Developers love Next.js"
          contentColor="error"
          color="white"
        >
          <Button flat auto color="error">
            Error
          </Button>
        </Tooltip>
      </Grid>
    </Grid.Container>
  );
}`;

const react = {
  "/App.js": App,
};

export default {
  ...react,
};
