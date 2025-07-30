import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { useAuthStore } from "../model/useAuthStore";

const Login = () => {

  const { Title } = Typography
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useAuthStore();

  const mutation = useMutation({
  mutationFn: login,
  onSuccess: (res) => {
    setAccessToken(res.data.token.accessToken);
    setRefreshToken(res.data.token.refreshToken);
    navigate('/profile');
  },
  onError: () => alert('Ошибка входа')
});

  const onFinish = (values) => {
    mutation.mutate(values)
  }

  return (
    <div>
      <Title level={2}>Вход</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Пожалуйста, введите ваш email'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login;