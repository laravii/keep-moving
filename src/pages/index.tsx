import React, { useContext } from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head';
import {GetServerSideProps} from 'next'

import styles from '../styles/pages/Home.module.css'
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesContext, ChallengesProvider } from "../contexts/ChallengesContext";
import { ProfileInfosModal } from "../components/ProfileInfosModal";
import { ProfileContext, ProfileProvider } from "../contexts/ProfileContext";
import { ConfirmationModal } from "../components/ConfirmationModal";

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompletes: number;
  userName: string;
  photo: string;
}

export default function Home(props:HomeProps) {
  const {isProfileInfosModal} = useContext(ProfileContext)
  return (
  <ChallengesProvider
  level={props.level} 
  currentExperience={props.currentExperience} 
  challengesCompletes={props.challengesCompletes}>
    <div className={styles.container}>
      <Head>
        <title>Home | Keep Moving</title>
      </Head>
    <ExperienceBar></ExperienceBar>
    <CountdownProvider>
    <section>
      <div>
        <ProfileProvider>
          <Profile/>
          <CompletedChallenges/>
          <Countdown/>
        </ProfileProvider>
      </div>
      <div>
        <ChallengeBox/>
      </div>
    </section>
    </CountdownProvider>
    </div>
  </ChallengesProvider>
  );
}

export const getServerSideProps:GetServerSideProps = async (ctx) =>{
  const {level, currentExperience, challengesCompletes} = ctx.req.cookies;
  return {
    props: {level: Number(level), 
            currentExperience: Number(currentExperience),
            challengesCompletes: Number(challengesCompletes),
          }
  }
}
