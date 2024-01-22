import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import "./styles.css";
import AuthenticationService from "../../../services/authentication.service";
import { useState } from "react";
import logo from "../../../assets/images/uz-logoo.png";
import useToken from "../../../hooks/useToken";

export default function Login() {
  const {token, setToken} = useToken();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password === "" || username === "") {
      message.error("Please enter all the details.");
      return 0;
    }

    setLoading(true);
    setDisabled(true);

    try {
      const response = await AuthenticationService.login({
        username: username,
        password: password,
      });

      if (response?.status === 200) {
        setToken(response?.data);
      }
      window.location.replace("/");
      setDisabled(false);
      setLoading(false);
      return 1;
    } catch (e) {
      setDisabled(false);
      setLoading(false);
      message.error("Account with given credentials not found.");
      return 0;
    }
  };

  return (
    <div className="login-container">
      <Form className="login-form" onSubmitCapture={handleLogin}>
      <h5 className="mb-1 text-center">Please Sign in to continue to your account</h5>
        <img src={logo} alt="uz logo" className="website-logo-login-form" />
        <Form.Item>
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
            className="rounded-1"
            // onInput={toInputUppercase}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            size="large"
            prefix={<LockOutlined />}
            placeholder="Password"
            className="rounded-1"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            icon={<LoginOutlined />}
            loading={loading}
            disabled={disabled}
          >
            Sign in
          </Button>
        </Form.Item>
        <div className="mt-2 text-center">
          <span className="text-muted">
            By signing in, I agree to UZ{" "}
          </span>
          <a href="/#" className="text-muted">
            Terms
          </a>
          <span className="text-muted"> and </span>
          <a href="/#" className="text-muted">
            Privacy Policy
          </a>
        </div>
      </Form>
    </div>
  );
}
