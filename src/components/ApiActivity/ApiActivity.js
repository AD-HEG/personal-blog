import React, { useState, useEffect } from 'react';
import './ApiActivity.css';

const ApiActivity = () => {
    const [experiencias, setExperiencias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newExperiencia, setNewExperiencia] = useState({
        nombreEmpresa: '',
        cargo: '',
        descripcion: '',
        year: ''
    });

    const API_BASE_URL = 'http://localhost:3000';

    // Obtener todas las experiencias
    const fetchExperiencias = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/todas`);
            if (!response.ok) throw new Error('Error al obtener datos');
            const data = await response.json();
            setExperiencias(data);
            setError('');
        } catch (err) {
            setError('Error al conectar con la API: ' + err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Crear nueva experiencia
    const createExperiencia = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            console.log('Creando nueva experiencia');
            const response = await fetch(`${API_BASE_URL}/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newExperiencia),
            });

            if (!response.ok) throw new Error('Error al crear experiencia');

            // Limpiar formulario
            setNewExperiencia({
                nombreEmpresa: '',
                cargo: '',
                descripcion: '',
                year: ''
            });

            // Recargar datos
            fetchExperiencias();
            setError('');
        } catch (err) {
            setError('Error al crear experiencia: ' + err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar experiencia
    const deleteExperiencia = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta experiencia?')) return;

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/eliminar/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Error al eliminar experiencia');

            // Recargar datos
            fetchExperiencias();
            setError('');
        } catch (err) {
            setError('Error al eliminar experiencia: ' + err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        fetchExperiencias();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExperiencia(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <section id="api-activity" className="api-activity-section">
            <div className="container">
                <h2>Actividad API - Gestión de Experiencias</h2>

                {/* Información de la API */}
                <div className="api-info">
                    <p><strong>API Endpoint:</strong> {API_BASE_URL}</p>
                    <button
                        onClick={fetchExperiencias}
                        className="btn btn-refresh"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : '🔄 Actualizar Datos'}
                    </button>
                </div>

                {/* Formulario para crear nueva experiencia */}
                <div className="form-container">
                    <h3>Agregar Nueva Experiencia</h3>
                    <form onSubmit={createExperiencia}>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="nombreEmpresa"
                                    value={newExperiencia.nombreEmpresa}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de la empresa"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="cargo"
                                    value={newExperiencia.cargo}
                                    onChange={handleInputChange}
                                    placeholder="Cargo"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="year"
                                    value={newExperiencia.year}
                                    onChange={handleInputChange}
                                    placeholder="Año (ej: 2024)"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea
                                name="descripcion"
                                value={newExperiencia.descripcion}
                                onChange={handleInputChange}
                                placeholder="Descripción de la experiencia"
                                rows="3"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-create" disabled={loading}>
                            {loading ? 'Creando...' : '➕ Agregar Experiencia'}
                        </button>
                    </form>
                </div>

                {/* Mostrar errores */}
                {error && (
                    <div className="alert alert-error">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Lista de experiencias */}
                <div className="experiencias-container">
                    <h3>Experiencias desde la API ({experiencias.length})</h3>

                    {loading && <div className="loading">Cargando datos...</div>}

                    {!loading && experiencias.length === 0 && (
                        <div className="empty-state">
                            <p>No hay experiencias registradas en la API.</p>
                            <p>¡Agrega la primera experiencia usando el formulario!</p>
                        </div>
                    )}

                    <div className="experiencias-grid">
                        {experiencias.map((exp) => (
                            <div key={exp._id} className="experiencia-card">
                                <div className="card-header">
                                    <h4>{exp.nombreEmpresa}</h4>
                                    <button
                                        onClick={() => deleteExperiencia(exp._id)}
                                        className="btn-delete"
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                </div>
                                <div className="card-body">
                                    <p className="cargo"><strong>{exp.cargo}</strong></p>
                                    <p className="year">📅 {exp.year}</p>
                                    <p className="descripcion">{exp.descripcion}</p>
                                    {exp.id && <small className="id">ID: {exp.id}</small>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ApiActivity;