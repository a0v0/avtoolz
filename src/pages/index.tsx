import useDocsRoute from "@hooks/use-docs-route";
import ToolsLayout from "@layouts/tools";
import { MetaProps } from "@lib/tools/meta";
import { fetchDocsManifest, findRouteByPath, Route } from "@lib/tools/page";
import { getSlug } from "@lib/tools/utils";
import { useTheme } from "@nextui-org/react";
import manifest from "manifest.json";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  routes: Route[];
  currentRoute?: Route;
  meta?: MetaProps;
}

const IndexPage: React.FC<Props> = ({ routes, currentRoute }) => {
  const { route, prevRoute, nextRoute } = useDocsRoute(routes, currentRoute);
  const router = useRouter();
  const { tag } = getSlug(router.query);
  const { isDark } = useTheme();

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
      <Image
        src={
          isDark
            ? "/avtoolz-banner-dark-shadow.png"
            : "/avtoolz-banner-light-shadow.png"
        }
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
    </ToolsLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const manifest = await fetchDocsManifest();
  const route = manifest && findRouteByPath(resolvedUrl, manifest.routes);

  return {
    props: {
      routes: manifest.routes,
      currentRoute: route,
    },
  };
};

export default IndexPage;
