import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Notification } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState, createContext, useContext, useMemo } from "react";
import { Notifications } from "@mantine/notifications";
import { RequestLogin } from "./userBacklog";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Button, Group, Box } from "@mantine/core";
import { LoginContext } from "./AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authenticated, setAuthenticated } = useContext(LoginContext);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("submit").click();
    }
  };

  const [login, setLogin] = useState(false);

  const handleClick = () => {
    RequestLogin({ username, password }).then((res) => {
      if (res === "true") {
        setLogin(true);
        setLoading(true);

        setAuthenticated(true);

        return Notifications.show({
          icon: <IconCheck size="1.1rem" />,
          title: "Announcement",
          message: "Login successfully 😁😁😁",
          color: "teal",
          autoClose: 3000,
        });
      } else {
        setLogin(false);
        setAuthenticated(false);

        return Notifications.show({
          title: "Announcement",
          message: "Login successfully 😭😭😭",
          icon: <IconX size="1.1rem" />,
          color: "red",
          autoClose: 3000,
        });
      }
    });
  };

  const handleOpen = () => {
    if (login) {
      setTimeout(() => {
        navigate("/backlog");
      }, 2500);
    }
  };

  return (
    <div>
      <Notifications title="Teal notification" position="top-right" />
      {handleOpen()}
      <div className="container">
        <div className="login">
          <span>
            <FontAwesomeIcon icon={faUser} className="icon-login" />
          </span>
          <h1>LOGIN FORM</h1>
          <form
            className="form"
            onClick={(event) => event.preventDefault()}
            onKeyDown={handleKeyDown}
          >
            <label htmlFor="" className="label-login">
              <span>
                <FontAwesomeIcon icon={faUserTie} className="icon-form" />
              </span>
              Username
            </label>
            <input
              className="input-form"
              type="text"
              placeholder="vanlang2023"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </form>
          <form
            className="form"
            onClick={(e) => e.preventDefault()}
            onKeyDown={handleKeyDown}
          >
            <label htmlFor="" className="label-login">
              <span>
                <FontAwesomeIcon icon={faKey} className="icon-form" />
              </span>
              Password
            </label>
            <input
              className="input-form"
              type="password"
              placeholder="************"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </form>
          <form onClick={(e) => e.preventDefault()}>
            {/* <input
              className="submit-form"
              type="submit"
              value="Login"
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              id="submit"
            /> */}
            <Button
              id="submit"
              type="primary"
              onClick={handleClick}
              loading={loading}
              onKeyDown={handleKeyDown}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
