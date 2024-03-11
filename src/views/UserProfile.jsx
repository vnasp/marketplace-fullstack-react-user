// axios
import axios from "axios";

// hooks
import { useState, useContext, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";

// context
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

// react-bootstrap
import { Container, Row, Col, Accordion, Image } from "react-bootstrap";

// components
import NavigationTrail from "../components/NavigationTrail";
import ProductSlider from "../components/ProductSlider";

const UserProfile = () => {
    const Auth = useContext(AuthContext);

    const { userObjective, users } = useContext(DataContext);
    const [isLinkClicked, setIsLinkClicked] = useState(false);
    const [user, setUser] = useState({});

    const urlBaseServer = "http://localhost:3000/api/v1";
    // const { userId } = useParams();
    // const id = parseInt(userId, 10);

    // Objecto usuario según id
    // const user = users.find((user) => user.id_user === id);

    // Gamificación Mi Market Latino
    const filledStarsCount =
        Object.values(userObjective).filter(Boolean).length;
    const stars = Array.from({ length: 5 }, (_, index) => (
        <i
            key={index}
            className={`bi bi-star-fill text-primary me-1 ${
                index < filledStarsCount ? "" : "opacity-25"
            }`}></i>
    ));

    // Apertura del menú en móviles
    const [open, setOpen] = useState(false);
    const handleLinkClick = () => {
        setOpen(false);
        setIsLinkClicked(true);
    };

    // Orden product slider
    const sortByNameAsc = (products) => {
        return products.slice().sort((a, b) => a.name.localeCompare(b.name));
    };

    // user login with email
    const userWithEmail = async () => {
        try {
            const token = sessionStorage.getItem("access_token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(
                `${urlBaseServer}/users/${user.id_user}`,
                config
            );
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error("Error logging in with email and password:", error);
        }
    };
    useEffect(() => {
        userWithEmail();
    }, []);

    return (
        user && (
            <Container fluid className="bg-body-secondary">
                <section className="px-5 pt-4">
                    <NavigationTrail
                        paths={[
                            {
                                text: "Inicio",
                                to: "/",
                            },
                            {
                                text: "Mi Perfil",
                                active: true,
                            },
                        ]}></NavigationTrail>
                </section>
                <Row className="mx-1 mx-lg-0 py-2 gap-4 justify-content-center">
                    <Col className="col-12 col-lg-3 rounded-4 box-shadow bg-white p-2">
                        <section className="d-flex flex-row flex-lg-column justify-content-lg-center align-items-lg-center gap-4">
                            <div style={{ width: "100px", height: "100px" }}>
                                {user && user.avatar_url ? (
                                    <Image
                                        src={user.avatar_url}
                                        width={100}
                                        className="rounded-circle"
                                    />
                                ) : (
                                    <div className="d-flex justify-content-center align-items-center w-100 h-100 rounded-circle bg-body-secondary">
                                        <i className="bi bi-camera fs-1"></i>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h2 className="fs-6">
                                    {user.firstname} {user.lastname}
                                </h2>
                                {user.email}
                                <br />
                                {stars}
                            </div>
                        </section>
                        <section>
                            <Accordion
                                className="d-md-none py-2"
                                activeKey={open ? "0" : ""}>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header
                                        onClick={() => setOpen(!open)}>
                                        Menú Mi Perfil
                                    </Accordion.Header>
                                    <Accordion.Body className="d-flex flex-column">
                                        <Link
                                            to="mis-datos"
                                            onClick={handleLinkClick}
                                            className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                                            <i className="bi bi-person text-white me-2"></i>
                                            Mis Datos
                                        </Link>
                                        <Link
                                            to="mis-favoritos"
                                            onClick={handleLinkClick}
                                            className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                                            <i className="bi bi-heart text-white me-2"></i>
                                            Mis Favoritos
                                        </Link>
                                        <Link
                                            to="mis-productos"
                                            onClick={handleLinkClick}
                                            className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                                            <i className="bi bi-box2-heart text-white me-2"></i>
                                            Mis Productos
                                        </Link>
                                        <Link
                                            to="mis-compras"
                                            onClick={handleLinkClick}
                                            className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                                            <i className="bi bi-bag text-white me-2"></i>
                                            Mis Compras
                                        </Link>
                                        <Link
                                            to="mis-ventas"
                                            onClick={handleLinkClick}
                                            className="text-decoration-none px-3 py-2 btn-secondary rounded-4 text-white box-shadow my-2">
                                            <i className="bi bi-cash-coin text-white me-2"></i>
                                            Mis Ventas
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <div className="d-none d-md-flex flex-md-column align-items-center">
                                <hr className="border-2 border-secondary w-100" />
                                <Link
                                    to="mis-datos"
                                    onClick={() => setIsLinkClicked(true)}
                                    className="btn btn-secondary text-white box-shadow w-75 my-2">
                                    <i className="bi bi-person text-white me-2"></i>
                                    Mis Datos
                                </Link>
                                <Link
                                    to="mis-favoritos"
                                    onClick={() => setIsLinkClicked(true)}
                                    className="btn btn-secondary text-white box-shadow w-75 my-2">
                                    <i className="bi bi-heart text-white me-2"></i>
                                    Mis Favoritos
                                </Link>
                                <Link
                                    to="mis-productos"
                                    onClick={() => setIsLinkClicked(true)}
                                    className="btn btn-secondary text-white box-shadow w-75 my-2">
                                    <i className="bi bi-box2-heart text-white me-2"></i>
                                    Mis Productos
                                </Link>
                                <Link
                                    to="mis-compras"
                                    onClick={() => setIsLinkClicked(true)}
                                    className="btn btn-secondary text-white box-shadow w-75 my-2">
                                    <i className="bi bi-bag text-white me-2"></i>
                                    Mis Compras
                                </Link>
                                <Link
                                    to="mis-ventas"
                                    onClick={() => setIsLinkClicked(true)}
                                    className="btn btn-secondary text-white box-shadow w-75 my-2">
                                    <i className="bi bi-cash-coin text-white me-2"></i>
                                    Mis Ventas
                                </Link>
                            </div>
                        </section>
                    </Col>
                    <Col className="col-12 col-lg-8 rounded-4 box-shadow bg-body-tertiary p-4">
                        {!isLinkClicked ? (
                            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                                <h1>¡Hola {user.firstname}!</h1>
                                <p>
                                    Este es tu dashboard. Navega por el menú,
                                    cumple los objetivos,
                                    <br /> gana estrellas y accede a beneficios
                                    exclusivos.
                                </p>
                            </div>
                        ) : (
                            <Outlet context={{ user, setIsLinkClicked }} />
                        )}
                    </Col>
                </Row>
                <section>
                    <h3 className="text-center mt-5">
                        Productos que podrían interesarte
                    </h3>
                    <ProductSlider sortBy={sortByNameAsc} />
                </section>
            </Container>
        )
    );
};

export default UserProfile;
