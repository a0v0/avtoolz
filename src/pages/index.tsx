import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { getRawFileFromRepo } from "@lib/github/raw";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import Markdown from "markdown-to-jsx";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  routes: Route[];
  currentRoute?: Route;
  meta?: MetaProps;
  content: string;
}

const IndexPage: React.FC<Props> = ({ routes, currentRoute, content }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);

  const meta: MetaProps = {
    title: route.title.split(":")[1],
    description: route.description,
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
      <Markdown>{content}</Markdown>
    </ToolsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
  req,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const manifest = await fetchDocsManifest();
  const route = manifest && findRouteByPath(resolvedUrl, manifest.routes);

  const content = await getRawFileFromRepo("README.md", "main/");

  return {
    props: {
      routes: manifest.routes,
      currentRoute: route,
      content: content,
    },
  };
};

export default IndexPage;
