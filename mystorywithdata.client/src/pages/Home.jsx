import { Link } from 'react-router-dom'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const sections = [
    {
        icon: 'fas fa-blog',
        title: 'Blog',
        description: "Suivez mes derniers articles sur la Data Science, l'IA et plus.",
        link: '/blog'
    },
    {
        icon: 'fas fa-chart-bar',
        title: 'Rapports',
        description: "Découvrez mes tableaux de bord Power BI et analyses de données.",
        link: '/rapports'
    },
    {
        icon: 'fas fa-cogs',
        title: 'Services',
        description: "Explorez mes offres de services en science des données.",
        link: '/services'
    },
    {
        icon: 'fas fa-comments',
        title: 'Feedback',
        description: "Consultez les retours de mes clients et partenaires.",
        link: '/feedback'
    },
    {
        icon: 'fas fa-envelope',
        title: 'Contact',
        description: "Vous souhaitez collaborer ? Contactez-moi ici.",
        link: '/contact'
    }
]

export default function Home() {
    return (
        <div className="container-fluid py-5 px-4">
            <h1 className="text-center">Bienvenue sur Mon Portfolio</h1>
            <p className="text-center mb-5">
                Explorez mes projets et services à travers plusieurs catégories.
            </p>

            <div className="row justify-content-center">
                {sections.map((section, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-xl-3 mb-4 d-flex">
                        <div className="card section-card w-100">
                            <div className="card-body section-card-body text-center">
                                <i className={`${section.icon} section-icon`} style={{ fontSize: '2rem' }}></i>
                                <h5 className="mt-3">{section.title}</h5>
                                <p>{section.description}</p>
                                <Link to={section.link} className="btn btn-primary section-btn">
                                    Accéder
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
