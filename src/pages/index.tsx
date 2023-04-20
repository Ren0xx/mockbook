import styles from "./index.module.css";
import { type NextPage } from "next";
import { Container } from "@mui/material";
import Head from "next/head";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import SignIn from "@/components/SignIn";
import Header from "@/components/Header";
import MainPage from "@/components/Mainpage";
const Home = () => {
    const { data: sessionData } = useSession();
    if (!sessionData) {
        return <SignIn />;
    }
    return (
        <>
            <Head>
                <title>Mockbook</title>
                <meta name='description' content='Generated by create-t3-app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <MainPage />
            </Layout>
        </>
    );
};

export default Home;
