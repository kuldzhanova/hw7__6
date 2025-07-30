
import { Button, Card, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchCategories, updateProduct, fetchProducts } from "../api/productApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 


    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const { data: productsData } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    })

    const product = productsData?.data?.find((p) => p.id === id)

    useEffect(() => {
        if(product) {
            form.setFieldsValue({
                title: product.title,
                description: product.description,
                categoriesId: product.categoriesId,
                userId: product.userId
            })
        }
    }, [product, form]);

    const updateProductMutation = useMutation({
        mutationFn: (data) => updateProduct(id, data),
        onSuccess: () => {
            message.success("Продукт успешно изменен");
            queryClient.invalidateQueries(["products"]);
            navigate("/products");
        },
        onError: () => {
            message.error("Ошибка при изменении товара");
        }
    })



    return(

        <Card title="Создать продукт" style={{ maxWidth: 500, margin: "0 auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => updateProductMutation.mutate(values)}
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
        <Form.Item name="userId" hidden>
            <Input type="hidden" />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Создать товар
          </Button>
        </Form.Item>
      </Form>
    </Card>
    )
}

export default EditProduct;