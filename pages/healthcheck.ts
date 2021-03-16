import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

const Page = () => {};

export const getServerSideProps = async (
    context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
    context.res.end("ok");
    return { props: {} };
};

export default Page;
