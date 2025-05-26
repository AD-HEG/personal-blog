import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    // Inicializar EmailJS
    useEffect(() => {
        // Inicializar EmailJS con tu clave pública
        emailjs.init("zuFfWIbVqR8ZIfDag");
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!formData.nombre || !formData.email || !formData.mensaje) {
            showAlert('Por favor, completa todos los campos.', 'danger');
            return;
        }

        setIsSubmitting(true);

        try {
            // Preparar los parámetros para EmailJS
            const templateParams = {
                nombre: formData.nombre,
                email: formData.email,
                mensaje: formData.mensaje
            };

            // Enviar el correo usando EmailJS
            await emailjs.send(
                "service_sqjdror",    // Tu Service ID
                "template_x9218ab",   // Tu Template ID
                templateParams
            );

            // Mostrar mensaje de éxito
            showAlert('¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.', 'success');

            // Limpiar el formulario
            setFormData({
                nombre: '',
                email: '',
                mensaje: ''
            });

        } catch (error) {
            console.error('Error al enviar el correo:', error);
            showAlert('Ocurrió un error al enviar el mensaje. Por favor, intenta de nuevo más tarde.', 'danger');
        } finally {
            setIsSubmitting(false);
        }
    };

    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);

        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            setAlertMessage('');
            setAlertType('');
        }, 5000);
    };

    return (
        <section id="contacto" className="contact-section">
            <div className="container">
                <h2 className="text-center mb-4 fw-bold">Contacto</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="contact-card">
                            <div className="contact-card-body">
                                <div className="text-center mb-4">
                                    <h5 className="contact-title fw-bold mb-3">Información de contacto</h5>

                                    <div className="contact-info-item">
                                        <div className="contact-icon">
                                            <i className="bi bi-envelope"></i>
                                        </div>
                                        <span className="fw-medium">anacarosierra68@gmail.com</span>
                                    </div>

                                    <div className="contact-info-item">
                                        <div className="contact-icon">
                                            <i className="bi bi-telephone"></i>
                                        </div>
                                        <span className="fw-medium">3022323405</span>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                {/* Formulario con EmailJS */}
                                <h5 className="contact-title fw-bold mb-3 text-center">Envíame un mensaje</h5>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Tu nombre"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Tu correo electrónico"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            name="mensaje"
                                            value={formData.mensaje}
                                            onChange={handleInputChange}
                                            rows="3"
                                            placeholder="Escribe tu mensaje aquí..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-submit px-4"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <i className="bi bi-hourglass-split me-2"></i>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-send me-2"></i>
                                                    Enviar mensaje
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Alerta para mostrar resultado del envío */}
                                {alertMessage && (
                                    <div className={`alert alert-${alertType} mt-3`} role="alert">
                                        {alertMessage}
                                    </div>
                                )}

                                <div className="social-links mt-4 text-center">
                                    <a
                                        href="https://www.linkedin.com/in/ana-carolina-b03605289/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn social-btn-linkedin me-2"
                                    >
                                        <i className="bi bi-linkedin me-1"></i> LinkedIn
                                    </a>
                                    <a
                                        href="https://github.com/LaLisa191"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn social-btn-github"
                                    >
                                        <i className="bi bi-github me-1"></i> GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;