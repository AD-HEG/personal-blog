import React, { useEffect } from 'react';
import Typed from 'typed.js';
import './Home.css';

const Home = () => {
    useEffect(() => {
        // Configurar Typed.js para la animación de texto
        const typed = new Typed(".texto", {
            strings: ["Ingeniera de Software", "Tec. Conservación Recursos Nat."],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        // Cleanup function para evitar memory leaks
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="inicio" id="inicio">
            <div className="inicio-contenido">
                <h3>Hola, soy</h3>
                <h1>Ana Sierra</h1>
                <h3>Soy <span className="texto"></span></h3>
                <p>
                    Técnico en Conservación de Recursos Naturales con mas de 1 año de experiencia en el área de Restauración Ecológica.
                    Caracterizada por ser una persona responsable, orientada al logro de resultados, abierta al aprendizaje sin limitaciones al
                    cambio y la innovación de procesos.
                </p>
                <div className="inicio-redes">
                    <a
                        href="/documents/HV - Ana Sierra O..pdf"
                        className="btn btn-outline-info"
                        download="Hoja de vida Ana Sierra"
                    >
                        Descargar CV
                        <i className="bi bi-download ps-2"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/ana-carolina-b03605289/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-linkedin ps-2 fs-4"></i>
                    </a>
                    <a
                        href="https://github.com/LaLisa191"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-github ps-2 fs-4"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/ana_sierra19/profilecard/?igsh=bWJ5bXUwdGNwazk="
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="bi bi-instagram ps-2 fs-4"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Home;