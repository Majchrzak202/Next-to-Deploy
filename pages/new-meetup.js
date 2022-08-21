import React from "react";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
const NewMeetup = () => {
  const router = useRouter();

  const addMeetupHandler = async (meetupData) => {
    console.log(meetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();
    console.log(data);

    router.push('/')
  };
  return (
    <div>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </div>
  );
};

export default NewMeetup;
