import { Link } from "react-router-dom";

// hooks
import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// context
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Row, Col } from "react-bootstrap";

// components
import Product from "./Product";

const UserFavorites = () => {
  const { setIsLinkClicked } = useOutletContext();
  const { setUserObjective, favorites, getFavorites, products } = useContext(DataContext);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      setUserObjective(prevState => ({
        ...prevState,
        hasFavorites: true,
      }));
    }
  }, [favorites, setUserObjective]);

  const favoriteProducts = products.filter(product =>
    favorites.some(favorite => favorite.id_product === product.id_product)
  );


  return (
    <>
      <section>
        <h1>Mis Favoritos</h1>
        <p>
          {favoriteProducts.length === 0
            ? "Agrega un producto a Favoritos y recibe una estrella."
            : "¡Tus favoritos son increíbles! No dejes pasar la oportunidad y cómpralos."}
        </p>
      </section>
      <section>
        <Row className="row-cols-1 row-cols-lg-3">
          {favoriteProducts.map((product) => (
            <Col key={product.id_product}>
              <Product
                key={product.id_product}
                product={product}
              />
            </Col>
          ))}
        </Row>
      </section>
      <section className="d-flex justify-content-end mt-4">
        <Link
          className="bg-transparent text-black border-0"
          onClick={() => setIsLinkClicked(false)}>
          <i className="bi bi-arrow-left me-1"></i>Volver a Mi Perfil
        </Link>
      </section>
    </>
  );
};

export default UserFavorites;
