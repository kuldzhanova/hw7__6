import { Button, Card, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { addProduct, fetchCategories } from "../api/productApi";

const AddProduct = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      message.success("Продукт успешно добавлен");
      queryClient.invalidateQueries(["products"]);
      form.resetFields();
    },
    onError: (error) => {
      console.error("Ошибка при создании продукта:", error?.response?.data || error);
      message.error("Ошибка при создании продукта");
    },
  });


  return (
    <Card title="Создать продукт" style={{ maxWidth: 500, margin: "0 auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => createProductMutation.mutate(values)}
      >
        <Form.Item
          label="Название"
          name={"title"}
          rules={[{ required: true, message: "Введите название продукта" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание"
          name={"description"}
          rules={[{ required: true, message: "Введите описание продукта" }]}
        >
          <TextArea rows={4} placeholder="Краткое описание продукта" />
        </Form.Item>
        <Form.Item
          label="Категория"
          name={"categoriesId"}
          rules={[{ required: true, message: "Выберите категорию" }]}
        >
          <Select placeholder="Выберите категорию">
            {categoriesData?.data?.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Создать товар
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProduct;