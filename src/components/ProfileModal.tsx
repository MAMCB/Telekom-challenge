import { Link } from "react-router-dom";

interface ProfileModalProps {
    signedUp: boolean;
    userId: number;
    visible:boolean;
}
const ProfileModal = ({signedUp,userId,visible}:ProfileModalProps) => {
  return (
    <div
      className="profile-modal w-32  p-4 rounded-lg  z-10"
      style={{
        display: visible ? "block" : "none",
        position: "fixed",
        top: "50px", // Adjust the top margin
        right: "20px",
      }}
    >
      <div className="flex flex-col gap-4">
        <Link to="">{signedUp ? "Sign out" : "Sign in"}</Link>
        <Link to={`/profile/${userId}`}>Profile</Link>
      </div>
    </div>
  );
}

export default ProfileModal