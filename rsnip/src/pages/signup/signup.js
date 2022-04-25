import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";

import "./signupStyles.css";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignup = () => {
    try {
      Auth.signUp({
        username: "philip",
        email: "droberts@student.neumont.edu",
        password: "philipD123!",
        attributes: {
          email: "droberts@student.neumont.edu",
          name: "philip",
        },
      }).then((res) => {
        console.log(res);
        navigate("../confirmation", { replace: true });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='content signup'>
      <button onClick={() => handleSignup()}>Sign up</button>
    </div>
  );
};

export default SignUp;
