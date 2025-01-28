import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
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
      <h1 className="self-center telekom-title">{profile?.name}</h1>
      <div className="flex justify-start align-center p-4">
        <img src={profile?.avatar} alt={profile?.name} />

        <p className="max-w-lg self-center ml-8">{profile?.bio}</p>
      </div>
      <div className="flex justify-start align-center p-4">
        <div className="m-8 p-4">
          <h2 className="">{profile?.email}</h2>
          <div className="grid grid-cols-3 gap-4">
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
