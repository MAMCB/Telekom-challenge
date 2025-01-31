import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {  Timeline } from "flowbite-react";
//import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
//add cv to profile in data.json and display it in the profile page

interface Profile {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  socialMedia: SocialMedia[] | [];
  projects: number[] | [];
  events: number[] | [];
}
interface SocialMedia{
  name:string;
  url:string;
  logo:string;
}

const Profile = () => {
   const { id } = useParams<{ id: string }>();
   const [profile, setProfile] = useState<Profile | null>(null);
    useEffect(() => {
      fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => setProfile(data.profiles.find((profile: Profile) => profile.id === parseInt(id ? id : ""))));
    }, [id]);
  return (
    <div className="p-8">
      <h1 className="self-center lg:ml-48 telekom-title">{profile?.name}</h1>
      <div className="flex flex-col lg:flex-row justify-start align-center p-4">
        <img src={profile?.avatar} alt={profile?.name} />

        <p className="max-w-lg self-center ml-8 p-5">{profile?.bio}</p>
        <div>
          <h2>CV</h2>
          <Timeline></Timeline>
        </div>
      </div>
      <div className="flex justify-start align-center p-4">
        <div className="m-8 p-4">
          <h2 className="lg:ml-32">{profile?.email}</h2>
          <div className=" lg:ml-32 grid grid-cols-3 gap-4">
            {profile?.socialMedia.map((socialMedia) => (
              <a target="_blank" href={socialMedia.url}>
                <img
                  className="w-10"
                  src={socialMedia.logo}
                  alt={socialMedia.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
