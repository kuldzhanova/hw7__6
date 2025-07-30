import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Typography } from "antd";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";


const Register = () => {

  const { Title } = Typography
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => navigate('/login'),
    onError: () => alert('Ошибка регистрации')
  })

  const onFinish = (values) => {
    mutation.mutate(values)
  }


  return (
    <div>
      <Title level={2}>Регистрация</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
        >
          <Input />
        </Form.Item>
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
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register;