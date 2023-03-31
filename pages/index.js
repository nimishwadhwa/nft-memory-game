import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import GameContainer from "@/components/GameContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Memory Game</title>
      </Head>
      <GameContainer />
    </>
  );
}
