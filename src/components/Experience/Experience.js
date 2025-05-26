import React from 'react';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            company: "ACAFOR",
            position: "Supervisora",
            year: "2024",
            description: "Supervisión de trabajos en altura, así como la realización de informes técnicos para el seguimiento de inventarios forestales utilizando Sistemas de Información Geográfica para el monitoreo y seguimiento del material vegetal postsiembra.",
            logo: "/images/ACAFOR.png",
            website: "https://www.facebook.com/asociaciondecampesinosforestales/"
        },
        {
            id: 2,
            company: "Santuario de Flora y Fauna, Los Colorados",
            position: "Operario contratista",
            year: "2021",
            description: "Restauración ecológica mediante técnicas especializadas, trabajo en campo y recolección de semillas, junto con la producción de material vegetal y actividades viveristas para garantizar su desarrollo y adaptación.",
            logo: "/images/santuario.jpg",
            website: "https://www.parquesnacionales.gov.co/nuestros-parques/sff-los-colorados/"
        }
    ];

    return (
        <section className="experiencia-laboral" id="experiencia-laboral">
            <div className="container">
                <h2>Experiencia Laboral</h2>
                <div className="row justify-content-center">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="experience-card-wrapper">
                            <div className="card mb-3 experience-card">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            src={exp.logo}
                                            className="img-fluid rounded-start company-logo"
                                            alt={`Logo ${exp.company}`}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{exp.company}</h5>
                                            <p className="card-text">
                                                <small className="text-body-secondary fst-italic">
                                                    {exp.position} ({exp.year})
                                                </small>
                                            </p>
                                            <p className="card-text fw-medium">
                                                {exp.description}
                                            </p>
                                            <a
                                                href={exp.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-info fw-bold visit-btn"
                                            >
                                                Visitar
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;