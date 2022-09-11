import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm: FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/dashboard");
      }}
    >
      hello
    </button>
  );
};
