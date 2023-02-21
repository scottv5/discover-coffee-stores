import { useRouter } from "next/router";
import Head from "next/head";

const DynamicRoute = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>{id}</title>
      </Head>
      <div>
        <div>Page {id}</div>
      </div>
    </>
  );
};

export default DynamicRoute;
