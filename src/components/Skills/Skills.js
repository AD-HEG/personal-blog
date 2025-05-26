import React, { useEffect, useState } from 'react';
import './Skills.css';

const Skills = () => {
    const [skillsAnimated, setSkillsAnimated] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const skillsSection = document.getElementById("skills");
            if (skillsSection) {
                const distanciaSkills = window.innerHeight - skillsSection.getBoundingClientRect().top;

                if (distanciaSkills >= 300 && !skillsAnimated) {
                    setSkillsAnimated(true);

                    // Animar las barras de habilidades
                    const habilidades = document.getElementsByClassName("progreso");
                    if (habilidades.length > 0) {
                        habilidades[0].classList.add("javascript");
                        habilidades[1].classList.add("htmlcss");
                        habilidades[2].classList.add("canva");
                        habilidades[3].classList.add("comunicacion");
                        habilidades[4].classList.add("trabajo");
                        habilidades[5].classList.add("creatividad");
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [skillsAnimated]);

    const technicalSkills = [
        { name: "Javascript", percentage: "20%", animationClass: "javascript" },
        { name: "HTML & CSS", percentage: "35%", animationClass: "htmlcss" },
        { name: "Canva", percentage: "70%", animationClass: "canva" }
    ];

    const professionalSkills = [
        { name: "Comunicación", percentage: "80%", animationClass: "comunicacion" },
        { name: "Trabajo en Equipo", percentage: "70%", animationClass: "trabajo" },
        { name: "Creatividad", percentage: "99%", animationClass: "creatividad" }
    ];

    const SkillBar = ({ skill, index }) => (
        <div className="skill">
            <span>{skill.name}</span>
            <div className="barra-skill">
                <div className={`progreso ${skillsAnimated ? skill.animationClass : ''}`}>
                    <span>{skill.percentage}</span>
                </div>
            </div>
        </div>
    );

    return (
        <section className="skills" id="skills">
            <div className="contenido-seccion">
                <h2>Habilidades</h2>
                <div className="fila">
                    {/* Habilidades técnicas */}
                    <div className="col">
                        <h3>Habilidades Técnicas</h3>
                        {technicalSkills.map((skill, index) => (
                            <SkillBar key={index} skill={skill} index={index} />
                        ))}
                    </div>

                    {/* Habilidades profesionales */}
                    <div className="col">
                        <h3>Habilidades Profesionales</h3>
                        {professionalSkills.map((skill, index) => (
                            <SkillBar key={index + 3} skill={skill} index={index + 3} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;