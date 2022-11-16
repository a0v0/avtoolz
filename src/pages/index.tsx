import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { getRawFileFromRepo } from "@lib/github/raw";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import manifest from "manifest.json";
import { GetServerSideProps } from "next";
import Image from "next/image";
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
      <h1 style={{ textAlign: "center" }}>👋 Welcome netizens!</h1>
      <Image
        src="/mstile-310x310.png"
        alt="aVToolz site logo"
        title=""
        width="10vh"
        height="3vh"
        layout="responsive"
        objectFit="contain"
      />
      <p>
        aVToolz is a handy website containg a collection of tools to perform
        daily tasks. aVToolz offer tools for image conversion, file conversion,
        text transformation and many more...
      </p>
      <br></br>
      <p>
        New tools are added to this site frequently so do not forget to give a
        star on <a href={manifest.github_repo_url}>GitHub</a> and opt for
        notifications whenever a new version comes out.
      </p>
      <br></br>
      <p>
        Choose your tools from the sidebar or if on mobile from navigation bar.
      </p>
      <br></br>
      <h2>😘 Available Tools</h2>
      <p>
        Thanks to these awesome tools/libraries/resources that made aVToolz
        possible:
      </p>
      <ul>
        <li></li>
      </ul>
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
