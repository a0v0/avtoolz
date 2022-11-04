import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { GetServerSideProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  routes: Route[];
  currentRoute?: Route;
  source?: MDXRemoteSerializeResult;
}

const DocsPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);

  const meta: MetaProps = {
    title: "JPG TO PNG",
    description: "",
  };

  return (
    <ToolsLayout
      currentRoute={route}
      meta={meta}
      nextRoute={nextRoute}
      prevRoute={prevRoute}
      routes={routes}
      slug={router.route}
      tag={tag}
    >
      <h1>{meta.title}</h1>
    </ToolsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const manifest = await fetchDocsManifest();

  return {
    props: {
      routes: manifest.routes,
    },
  };
};

export default DocsPage;
