import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { GITHUB_REPO_URL } from "config";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  routes: Route[];
  currentRoute?: Route;
  meta?: MetaProps;
}

const IndexPage: React.FC<Props> = ({ routes, currentRoute, meta }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const { query } = useRouter();
  const { tag, slug } = getSlug(query);

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
        star on <a href={GITHUB_REPO_URL}>GitHub</a> and opt for notifications
        whenever a new version comes out.
      </p>
      <br></br>
      <p>
        Choose your tools from the sidebar or if on mobile from navigation bar.
      </p>
      <br></br>
      <h2>😘 Credits</h2>
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

export const getServerSideProps: GetServerSideProps = async () => {
  const manifest = await fetchDocsManifest();

  return {
    props: {
      routes: manifest.routes,
    },
  };
};

export default IndexPage;
