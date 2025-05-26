import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.querySelector('.header');

            if (!header) return;

            const headerHeight = header.offsetHeight;

            // Si estamos en la parte superior de la página, mostrar el header
            if (scrollTop <= 10) {
                header.style.top = "0";
                header.style.background = "transparent";
            }
            // Si estamos bajando, ocultar el header
            else if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                header.style.top = `-${headerHeight}px`;
            }
            // Si estamos subiendo, mostrar el header
            else {
                header.style.top = "0";
                header.style.background = "#00103c";
            }

            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    // Cerrar menú cuando la pantalla se agrande
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        // Cerrar menú móvil después del clic
        setIsMenuOpen(false);
    };

    return (
        <header className="header">
            <a href="#inicio" className="logo" onClick={(e) => {
                e.preventDefault();
                scrollToSection('inicio');
            }}>
                Anna
            </a>

            {/* Navegación para desktop */}
            <nav className="navbar-desktop">
                <a href="#inicio" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('inicio');
                }}>
                    Inicio
                </a>
                <a href="#skills" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('skills');
                }}>
                    Habilidades
                </a>
                <a href="#experiencia-laboral" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('experiencia-laboral');
                }}>
                    Experiencia laboral
                </a>
                <a href="#formacion" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('formacion');
                }}>
                    Formación
                </a>
                <a href="#contacto" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                }}>
                    Contacto
                </a>
                <a href="#api" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('api-activity');
                }} className="api-link">
                    Actividad API
                </a>
            </nav>

            {/* Botón hamburguesa para móvil */}
            <div className="menu-toggle" onClick={toggleMenu}>
                <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </div>

            {/* Navegación móvil */}
            <nav className={`navbar-mobile ${isMenuOpen ? 'active' : ''}`}>
                <a href="#inicio" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('inicio');
                }}>
                    Inicio
                </a>
                <a href="#skills" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('skills');
                }}>
                    Habilidades
                </a>
                <a href="#experiencia-laboral" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('experiencia-laboral');
                }}>
                    Experiencia laboral
                </a>
                <a href="#formacion" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('formacion');
                }}>
                    Formación
                </a>
                <a href="#contacto" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                }}>
                    Contacto
                </a>
                <a href="#api" onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('api-activity');
                }} className="api-link">
                    Actividad API
                </a>
            </nav>
        </header>
    );
};

export default Header;