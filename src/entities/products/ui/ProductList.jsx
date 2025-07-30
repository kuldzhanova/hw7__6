import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import { Avatar, Card, Col, Row, Button } from "antd";
import { Link } from "react-router-dom";
import { useCartStore } from "../../../features/auth/model/useCartStore";

const { Meta } = Card;

const ProductList = () => {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div>
      <Link to={"/products/create"}>
        <Button>Добавить продукт</Button>
      </Link>

      <Row gutter={[16, 16]}>
        {data?.data?.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                product.image ? (
                  <img
                    alt=""
                    src={product.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >
                    No image
                  </div>
                )
              }
            >
              <Meta
                avatar={
                  product.user?.username ? (
                    <Avatar>{product.user.username[0].toUpperCase()}</Avatar>
                  ) : null
                }
                title={product.title}
                description={
                  <>
                    <p>{product.description}</p>
                    <p style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
                      Category ID: <b>{product.categoriesId || "-"}</b>
                    </p>
                    <p style={{ marginTop: 4, fontSize: 12, color: "#888" }}>
                      Seller: <b>{product.user?.username || "Неизвестно"}</b>
                    </p>
                  </>
                }
              />
              <Link to={`/products/${product.id}/edit`}>
                <Button type="link">Редактировать</Button>
              </Link>
              <Button
                type="primary"
                block
                style={{ marginTop: 10 }}
                onClick={() => {
                  console.log("Добавляем в корзину", product);
                  addToCart(product);
                }}
              >
                Добавить в корзину
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;