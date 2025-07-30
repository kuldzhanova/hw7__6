import { Card, List, Typography, Button, InputNumber, Row, Col } from "antd";
import { useCartStore } from "../model/useCartStore";


const CartPage = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCartStore();

  return (
    <Card title="Корзина" style={{ maxWidth: 800, margin: "20px auto" }}>
      {cart.length === 0 ? (
        <Typography.Text>Корзина пуста</Typography.Text>
      ) : (
        <>
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button onClick={() => decreaseQuantity(item.id)}>-</Button>,
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => {
                      if (value > item.quantity) addToCart(item);
                      else if (value < item.quantity) decreaseQuantity(item.id);
                    }}
                    style={{ width: 60 }}
                  />,
                  <Button onClick={() => addToCart(item)}>+</Button>,
                  <Button onClick={() => removeFromCart(item.id)} danger>
                    Удалить
                  </Button>,
                ]}
              >
                <Row style={{ width: "100%" }}>
                  <Col span={12}>{item.title}</Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {item.price ? `${item.price} ₽` : ""}
                  </Col>
                </Row>
              </List.Item>
            )}
          />
          <Button
            type="primary"
            danger
            block
            onClick={clearCart}
            style={{ marginTop: 16 }}
          >
            Очистить корзину
          </Button>
        </>
      )}
    </Card>
  );
};

export default CartPage;