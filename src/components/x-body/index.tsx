import Header from "@components/header";
import Sidebar from "@components/sidebar";
import { Grid } from "@nextui-org/react";

export default function XBody({ children }: any) {
  return (
    <>
      <Header />
      <Grid.Container wrap="nowrap" gap={1} justify="flex-start">
        <Grid xs={3}>
          <Sidebar />
        </Grid>
        <Grid xs={50}>{children}</Grid>
      </Grid.Container>
    </>
  );
}
