import { FaRegCheckCircle } from 'react-icons/fa'

export default function Service() {
    const services = [
        {
            title: 'Data Science & Machine Learning',
            description:
                'Nous offrons des services de modélisation prédictive, analyse de données et création de modèles d\'apprentissage automatique pour résoudre des problèmes complexes.',
        },
        {
            title: 'Data Engineering & Pipelines',
            description:
                'Optimisation de flux de données, gestion des pipelines ETL, et intégration avec des systèmes d\'entreprise pour automatiser les processus de données.',
        },
        {
            title: 'Business Intelligence',
            description:
                'Création de dashboards interactifs et de rapports Power BI pour transformer les données en insights décisionnels à l\'aide de visualisations claires et dynamiques.',
        },
        {
            title: 'Consulting Cloud & Azure',
            description:
                'Nous aidons à la migration vers le cloud, à la mise en place de solutions Azure, ainsi qu’à l’optimisation de l\'infrastructure cloud pour des performances optimales.',
        },
    ]

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Nos Services</h1>

            <div className="row">
                {services.map((service, index) => (
                    <div className="col-md-6 col-lg-3 mb-4" key={index}>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h5 className="card-title text-center">
                                    <FaRegCheckCircle className="text-primary me-2" />
                                    {service.title}
                                </h5>
                                <p className="card-text">{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
