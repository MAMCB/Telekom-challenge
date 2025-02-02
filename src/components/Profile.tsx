import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {  Timeline } from "flowbite-react";
import {  HiCalendar } from "react-icons/hi";
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
  cv:CV;

}
interface SocialMedia{
  name:string;
  url:string;
  logo:string;
}

interface Education{
  id:number;
  degree:string;
  school:string;
  year:number;
}

interface Experience{
  id:number;
  title:string;
  company:string;
  year:number;
}

interface CV {
  education: Education[];
  experience: Experience[];
}

const Profile = () => {
   const { id } = useParams<{ id: string }>();
   const [profile, setProfile] = useState<Profile | null>(null);
    useEffect(() => {
      fetch(`../../data.json`)
        .then((response) => response.json())
        .then((data) => {const userProfile =data.profiles.find((profile: Profile) => profile.id === parseInt(id ? id : ""));
          const sortedEducation = [...userProfile.cv.education].sort(
            (a, b) => b.year - a.year
          );
          const sortedExperience = [...userProfile.cv.experience].sort(
            (a, b) => b.year - a.year
          );
          setProfile({
            ...userProfile,
            cv: { education: sortedEducation, experience: sortedExperience },
          });
        });
    }, [id]);

    
  return (
    <div className="p-8">
      <h1 className="self-center lg:ml-48 telekom-title">{profile?.name}</h1>
      <div className="flex flex-col lg:flex-row justify-around align-center p-4">
        <div className="flex justify-center align-center p-4">
          <img src={profile?.avatar} alt={profile?.name} />

          <p className="max-w-lg self-center ml-8 p-5">{profile?.bio}</p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold mx-auto">CV</h2>
          <div className="flex justify-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold mx-auto">Education</h2>
              <Timeline>
                {profile &&
                  profile.cv.education.map((education) => (
                    <Timeline.Item key={education.id + "education"}>
                      <Timeline.Point icon={HiCalendar} />
                      <Timeline.Content>
                        <Timeline.Time>{education.year}</Timeline.Time>
                        <Timeline.Title>{education.degree}</Timeline.Title>
                        <Timeline.Body>{education.school}</Timeline.Body>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
              </Timeline>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold mx-auto">Experience</h2>
              <Timeline>
                {profile?.cv.experience.map((experience) => (
                  <Timeline.Item key={experience.id + "experience"}>
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                      <Timeline.Time>{experience.year}</Timeline.Time>
                      <Timeline.Title>{experience.title}</Timeline.Title>
                      <Timeline.Body>{experience.company}</Timeline.Body>
                    </Timeline.Content>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start align-center p-4">
        <div className="m-8 p-4">
          <h2 className="lg:ml-32">{profile?.email}</h2>
          <div className=" lg:ml-32 grid grid-cols-3 gap-4">
            {profile?.socialMedia.map((socialMedia) => (
              <a target="_blank" href={socialMedia.url} key={socialMedia.name}>
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
