// This page will show up at the route /mypage

import {
    PlasmicRootProvider,
    PlasmicComponent,
    ComponentRenderData,
    extractPlasmicQueryData
  } from '@plasmicapp/loader-nextjs';
  import { useRouter } from 'next/router';
  import { PLASMIC } from '../plasmic-init';
  
  // Statically fetch the data needed to render Plasmic pages or components.
  export const getStaticProps = async () => {
    // You can pass in multiple page paths or component names.
    const plasmicData = await PLASMIC.fetchComponentData('/department-page');
    if (!plasmicData) {
      throw new Error('No Plasmic design found');
    }
  
    const compMeta = plasmicData.entryCompMetas[0];
  
    // Cache the necessary data fetched for the page
    const queryCache = await extractPlasmicQueryData(
      <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData} pageParams={compMeta.params}>
        <PlasmicComponent component={compMeta.displayName} />
      </PlasmicRootProvider>
    );
    return {
      props: {
        plasmicData,
        queryCache
        // ...
      },
  
      // Using incremental static regeneration, will invalidate this page
      // after 300s (no deploy webhooks needed)
      revalidate: 300
    };
  };
  
  // Render the page or component from Plasmic.
  export default function MyPage(props: { plasmicData: ComponentRenderData; queryCache?: Record<string, any> }) {
    const router = useRouter();
    const compMeta = props.plasmicData.entryCompMetas[0];
    console.log(compMeta, props, 'props')
    return (
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={props.plasmicData}
        prefetchedQueryData={props.queryCache}
        pageParams={compMeta.params}
        pageQuery={router.query}
      >
        <PlasmicComponent component={compMeta.displayName} />
      </PlasmicRootProvider>
    );
  }