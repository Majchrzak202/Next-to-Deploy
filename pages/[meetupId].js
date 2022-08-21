import React from "react";
import MeetupDetail from "../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="descrition" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb://inkapusta0:Naukaprogramowania1@ac-cjrttmg-shard-00-00.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-01.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-02.k8alrhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-xuf6pl-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb://inkapusta0:Naukaprogramowania1@ac-cjrttmg-shard-00-00.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-01.k8alrhp.mongodb.net:27017,ac-cjrttmg-shard-00-02.k8alrhp.mongodb.net:27017/?ssl=true&replicaSet=atlas-xuf6pl-shard-0&authSource=admin&retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        adress: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
