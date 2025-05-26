import React, { useState, useEffect, useRef } from 'react';
import './Formation.css';

const Formation = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [previousSlide, setPreviousSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const slideInterval = useRef(null);
    const currentSlideRef = useRef(0); // Referencia para el intervalo

    const slides = [
        {
            id: 0,
            image: "/images/Ing software.png",
            title: "Ingeniería de Software",
            description: "En proceso de formación para desarrollo de aplicaciones y soluciones digitales."
        },
        {
            id: 1,
            image: "/images/restauracion.png",
            title: "Técnico en Conservación de Recursos Naturales",
            description: "SENA - 2020"
        },
        {
            id: 2,
            image: "/images/sistemas.png",
            title: "Técnico en Sistemas",
            description: "Institución Educativa Académica y Técnica en Gestión Empresarial Diógenes A. Arrieta - 2017"
        }
    ];

    // Actualizar la referencia cuando cambie currentSlide
    useEffect(() => {
        currentSlideRef.current = currentSlide;
    }, [currentSlide]);

    // Función para aplicar la animación de transición (código original adaptado)
    const applyTransition = (currentIndex, previousIndex, direction) => {
        const allSlides = document.querySelectorAll('.slide');

        // Limpiar cualquier clase de animación previa en todas las diapositivas
        allSlides.forEach(slide => {
            slide.style.transition = 'none';
            slide.style.transform = '';
            slide.style.opacity = '0';
            slide.style.display = 'none';
            slide.classList.remove('active');
        });

        // Configurar la diapositiva actual y la anterior para la animación
        const currentSlideElement = allSlides[currentIndex];
        const previousSlideElement = allSlides[previousIndex];

        if (!currentSlideElement || !previousSlideElement) {
            setIsAnimating(false);
            return;
        }

        // Mostrar ambas diapositivas para la animación
        previousSlideElement.style.display = 'block';
        currentSlideElement.style.display = 'block';

        // Configuración inicial para la animación
        if (direction === 'next') {
            // Diapositiva anterior comienza visible y centrada
            previousSlideElement.style.opacity = '1';
            previousSlideElement.style.transform = 'translateX(0)';

            // Diapositiva actual comienza fuera de la vista a la derecha
            currentSlideElement.style.opacity = '0';
            currentSlideElement.style.transform = 'translateX(100%)';
        } else {
            // Diapositiva anterior comienza visible y centrada
            previousSlideElement.style.opacity = '1';
            previousSlideElement.style.transform = 'translateX(0)';

            // Diapositiva actual comienza fuera de la vista a la izquierda
            currentSlideElement.style.opacity = '0';
            currentSlideElement.style.transform = 'translateX(-100%)';
        }

        // Forzar un reflow para asegurar que los cambios iniciales se apliquen
        void currentSlideElement.offsetWidth;

        // Aplicar la transición
        previousSlideElement.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        currentSlideElement.style.transition = 'transform 0.8s ease, opacity 0.8s ease';

        if (direction === 'next') {
            // Mover la diapositiva anterior hacia la izquierda y desvanecerla
            previousSlideElement.style.transform = 'translateX(-100%)';
            previousSlideElement.style.opacity = '0';

            // Mover la diapositiva actual al centro y mostrarla
            currentSlideElement.style.transform = 'translateX(0)';
            currentSlideElement.style.opacity = '1';
        } else {
            // Mover la diapositiva anterior hacia la derecha y desvanecerla
            previousSlideElement.style.transform = 'translateX(100%)';
            previousSlideElement.style.opacity = '0';

            // Mover la diapositiva actual al centro y mostrarla
            currentSlideElement.style.transform = 'translateX(0)';
            currentSlideElement.style.opacity = '1';
        }

        // Marcar la diapositiva actual como activa
        currentSlideElement.classList.add('active');

        // Actualizar los indicadores
        const allIndicators = document.querySelectorAll('.indicator');
        allIndicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Permitir nuevas animaciones después de que termine la transición
        setTimeout(() => {
            setIsAnimating(false);
        }, 800);
    };

    // Función para mostrar una diapositiva específica (código original adaptado)
    const showSlide = (n, direction = 'next') => {
        // Evitar clics múltiples durante la animación
        if (isAnimating) return;
        setIsAnimating(true);

        const slidesElements = document.querySelectorAll('.slide');
        const indicatorsElements = document.querySelectorAll('.indicator');

        if (!slidesElements.length || !indicatorsElements.length) {
            setIsAnimating(false);
            return;
        }

        // Usar currentSlideRef.current en lugar de currentSlide
        const prevSlide = currentSlideRef.current;
        setPreviousSlide(prevSlide);

        // Resetea el índice si está fuera de límites
        let newSlide;
        if (n >= slides.length) {
            newSlide = 0;
        } else if (n < 0) {
            newSlide = slides.length - 1;
        } else {
            newSlide = n;
        }

        // Si es la misma diapositiva, no hacer nada
        if (newSlide === currentSlideRef.current) {
            setIsAnimating(false);
            return;
        }

        setCurrentSlide(newSlide);

        // Aplicar la animación de transición
        applyTransition(newSlide, prevSlide, direction);
    };

    // Función para mover a la siguiente o anterior diapositiva
    const moveSlide = (n) => {
        const direction = n > 0 ? 'next' : 'prev';
        const targetSlide = currentSlideRef.current + n;
        showSlide(targetSlide, direction);
        resetInterval();
    };

    // Función para ir a una diapositiva específica (usado por los indicadores)
    const setSlide = (n) => {
        const direction = n > currentSlide ? 'next' : 'prev';
        showSlide(n, direction);
        resetInterval();
    };

    // Función para iniciar el intervalo del carrusel
    const startCarousel = () => {
        slideInterval.current = setInterval(() => {
            // Usar la referencia para obtener el valor actual
            const nextSlide = currentSlideRef.current >= slides.length - 1 ? 0 : currentSlideRef.current + 1;
            showSlide(nextSlide, 'next');
        }, 6000);
    };

    // Función para resetear el intervalo
    const resetInterval = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
        startCarousel();
    };

    // Inicializar el carrusel cuando se carga la página (código original adaptado)
    useEffect(() => {
        const timer = setTimeout(() => {
            const slidesElements = document.querySelectorAll('.slide');
            const indicatorsElements = document.querySelectorAll('.indicator');

            if (slidesElements.length && indicatorsElements.length) {
                // Asegurarse de que solo la primera diapositiva tenga la clase active
                slidesElements.forEach((slide, index) => {
                    if (index === 0) {
                        slide.classList.add('active');
                        slide.style.opacity = '1';
                        slide.style.transform = 'translateX(0)';
                        slide.style.display = 'block';
                    } else {
                        slide.classList.remove('active');
                        slide.style.opacity = '0';
                        slide.style.display = 'none';
                    }
                });

                // Actualizar los indicadores
                indicatorsElements.forEach((indicator, index) => {
                    if (index === 0) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });

                startCarousel(); // Iniciar el carrusel automático
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (slideInterval.current) {
                clearInterval(slideInterval.current);
            }
        };
    }, []);

    return (
        <section className="formacion" id="formacion">
            <div className="container">
                <h2 className="text-center mb-5">Formación Académica</h2>

                <div className="custom-carousel">
                    <div className="slides-container">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`slide ${index === 0 ? 'active' : ''}`}
                            >
                                <div className="slide-content">
                                    <div className="slide-image">
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="slide-caption">
                                        <h3>{slide.title}</h3>
                                        <p>{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Controles de navegación */}
                    <div className="carousel-controls">
                        <button className="prev-btn" onClick={() => moveSlide(-1)}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <button className="next-btn" onClick={() => moveSlide(1)}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>

                    {/* Indicadores */}
                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setSlide(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Formation;