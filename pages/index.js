import React from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetup Projects</title>
        <meta
          name="descrition"
          content="Take care about your meetups and never forget again!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb://inkapusta0:Naukaprogramowania1@ac-cjrttmg-shard-00-00.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-01.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-02.k8alrhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-xuf6pl-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
