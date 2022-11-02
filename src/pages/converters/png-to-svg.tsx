import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/docs";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, getCurrentTag, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { getId } from "@utils/collections";
import { Action, useRegisterActions } from "kbar";
import { GetServerSideProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import router, { useRouter } from "next/router";
import React from "react";

interface Props {
  routes: Route[];
  currentRoute?: Route;
  source?: MDXRemoteSerializeResult;
  meta?: MetaProps;
}

const DocsPage: React.FC<Props> = ({ routes, currentRoute, meta }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);

  // kbar home action
  const homeAction: Action = React.useMemo(() => {
    return {
      id: getId(),
      name: "Go Home",
      section: "Scope",
      icon: "home",
      shortcut: [],
      keywords: "home, return, back, landing, page, init, initial",
      children: [],
      perform: () => router.push("/"),
    };
  }, [routes]);

  useRegisterActions([homeAction].filter(Boolean));

  return (
    <ToolsLayout
      currentRoute={route}
      meta={meta}
      nextRoute={nextRoute}
      prevRoute={prevRoute}
      routes={routes}
      slug={slug}
      tag={tag}
    >
      this is png to svg
    </ToolsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const tag = await getCurrentTag();
  const manifest = await fetchDocsManifest(tag);

  return {
    props: {
      routes: manifest.routes,
    },
  };
};

export default DocsPage;
