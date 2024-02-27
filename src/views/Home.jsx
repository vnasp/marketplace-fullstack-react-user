// components
import ProductSlider from "../components/ProductSlider";
import Reinsurances from "../components/Reinsurances";

// hooks
import React, { useContext, useEffect } from 'react';

// context
import { DataContext } from "../context/DataContext";


const Home = () => {
    const { title } = useContext(DataContext);

    // Cambia el título de la página
    useEffect(() => {
        document.title = `${title} - Home`;
    }, []);

    return (
        <>
            <header>
                <h1 className="title">Mi Market Latino</h1>
            </header>
            <main className="bg-body-secondary py-5">
                <Reinsurances />
                <section className="mt-5 pt-3">
                    <h2 className="text-center">Productos recién agregados</h2>
                    <ProductSlider />
                </section>
            </main>
        </>
    );
};

export default Home;
