import { useState } from 'react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Message envoyé :", formData)
        setSubmitted(true)

        // Reset form (optionnel)
        setFormData({ name: '', email: '', message: '' })

        // Tu pourras plus tard ajouter une logique pour envoyer à un backend ou une API
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h1 className="mb-4 text-center">Me Contacter</h1>

            {submitted ? (
                <div className="alert alert-success text-center" role="alert">
                    Merci pour votre message ! Je vous répondrai dès que possible.
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                    <div className="form-group mb-3">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Adresse e-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Votre email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows="5"
                            placeholder="Votre message..."
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Envoyer le message
                    </button>
                </form>
            )}
        </div>
    )
}
