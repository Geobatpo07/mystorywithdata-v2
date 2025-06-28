import { useState } from 'react'

export default function Blog() {
    const [articles] = useState([
        {
            id: 1,
            title: "Le Lakehouse : L'�quilibre Parfait entre Flexibilit� et Performance",
            date: "10 Avril 2025",
            excerpt: "Explorez comment le Lakehouse combine les avantages des Data Lakes et des Data Warehouses pour une architecture moderne.",
        },
        {
            id: 2,
            title: "Optimiser le Data Warehousing avec Microsoft Fabric",
            date: "2 Avril 2025",
            excerpt: "D�couvrez comment Microsoft Fabric et OneLake r�volutionnent la gestion des donn�es dans le cloud.",
        },
        {
            id: 3,
            title: "La Data Science dans le G�nie Civil",
            date: "25 Mars 2025",
            excerpt: "Une plong�e dans l�utilisation de la mod�lisation pr�dictive pour anticiper les risques structurels et optimiser les co�ts.",
        },
    ])

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Articles de Blog</h1>
            <p className="lead mb-5">Bienvenue dans mon espace de r�flexion autour de la Data, l�IA, l�ing�nierie des donn�es et bien plus encore.</p>

            <div className="row">
                {articles.map((article) => (
                    <div className="col-md-4 mb-4" key={article.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{article.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{article.date}</h6>
                                <p className="card-text">{article.excerpt}</p>
                                <a href={`/blog/${article.id}`} className="btn btn-outline-primary mt-auto">Lire la suite</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
