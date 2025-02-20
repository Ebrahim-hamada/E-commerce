import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const Profile = () => {
  const { userName } = useContext(UserContext);

  return (
    <>

      <div className="text-center text-4xl p-15 md:p-50 flex justify-center ">
        <h2 className=" pe-2">Welcome </h2>
        <span className="text-emerald-600  font-semibold"> {userName}</span>
      </div>
    </>
  );
};

export default Profile;
