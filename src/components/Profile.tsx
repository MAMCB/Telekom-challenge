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
    <div>
      <div className="flex justify-center align-center p-4">
        <img src={profile?.avatar} alt={profile?.name} />
        <h1>{profile?.name}</h1>
      </div>
      <div className="flex justify-center align-center p-4">
        <div>
          <h2>{profile?.email}</h2>
          <div className="grid grid-cols-3 gap-4">
            {profile?.socialMedia.map((socialMedia) => (
              <a href={socialMedia.url}>
                <img src={socialMedia.logo} alt={socialMedia.name} />
              </a>
            ))}
          </div>
        </div>
        <p>{profile?.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
