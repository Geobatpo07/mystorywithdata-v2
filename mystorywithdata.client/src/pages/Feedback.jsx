import { useState, useEffect } from 'react'

const dummyFeedbacks = [
    {
        name: 'Alice',
        comment: 'Super projet, très clair et bien présenté !',
        role: 'Data Analyst',
    },
    {
        name: 'Boris',
        comment: 'Bravo pour la démarche, c’est vraiment pro.',
        role: 'Chef de projet IT',
    },
    {
        name: 'Claire',
        comment: 'Une approche intelligente et bien structurée.',
        role: 'Ingénieure ML',
    },
    {
        name: 'David',
        comment: 'Ton portfolio est super agréable à parcourir.',
        role: 'Développeur Web',
    },
]

export default function Feedback() {
    const [feedbacks, setFeedbacks] = useState(dummyFeedbacks)
    const [form, setForm] = useState({ name: '', role: '', comment: '' })
    const [error, setError] = useState('')

    // Charger les feedbacks (simulé)
    useEffect(() => {
        const loadFeedbacks = () => {
            const shuffled = [...dummyFeedbacks].sort(() => 0.5 - Math.random())
            setFeedbacks(shuffled.slice(0, 3)) // Affiche 3 feedbacks aléatoires
        }

        loadFeedbacks()
    }, [])

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name || !form.role || !form.comment) {
            setError('Tous les champs doivent être remplis.')
            return
        }

        setFeedbacks([
            ...feedbacks,
            { name: form.name, role: form.role, comment: form.comment },
        ])

        // Réinitialiser le formulaire après soumission
        setForm({ name: '', role: '', comment: '' })
        setError('')
    }

    // Mise à jour des champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Ils en parlent...</h1>

            {/* Carrousel des feedbacks */}
            <div id="feedbackCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {feedbacks.map((fb, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <div className="d-block w-100 text-center">
                                <h5 className="card-title">{fb.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{fb.role}</h6>
                                <p className="card-text">“{fb.comment}”</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {/* Formulaire de feedback */}
            <h2 className="text-center mb-4">Laissez un feedback</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Votre nom"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Rôle
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="Votre rôle (ex: Data Analyst)"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                        Commentaire
                    </label>
                    <textarea
                        className="form-control"
                        id="comment"
                        name="comment"
                        rows="3"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Votre commentaire"
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Soumettre
                </button>
            </form>
        </div>
    )
}
