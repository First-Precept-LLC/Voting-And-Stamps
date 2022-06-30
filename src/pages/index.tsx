import Home from "~/components/home";
//import { useForm } from "react-hook-form";
import path from "path";
import { promises as fsPromises } from "fs";
import { muiMdComponents } from "~/components/layout/muiMdComponents";
import { PageLayout } from "~/components/layout";
import { Box } from "@mui/material";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Router from 'next/router'
import { useEffect } from "react";
// inject both the custom components + default components like h1, p, etc.
const components = { ...muiMdComponents };
const HomePage = ({ source }: { source: MDXRemoteSerializeResult }) => {
  const readMeContent = <MDXRemote {...source} components={components} />;
  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
        Router.push('/account/login')
    }
  });
  return (
    <p>Please wait while application is loading ........</p>
  );
};

export async function getStaticProps() {
  const filePath = path.resolve("./README.md");
  const source = await fsPromises.readFile(filePath, { encoding: "utf8" });
  // MDX text - can be from a local file, database, anywhere
  // Does a server-render of the source and relevant React wrappers + allow to inject React components
  const mdxSource = await serialize(source);
  return { props: { source: mdxSource } };
}

export default HomePage;
