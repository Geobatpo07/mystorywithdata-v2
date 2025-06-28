import { FaRegCheckCircle } from 'react-icons/fa'

export default function Service() {
    const services = [
        {
            title: 'Data Science & Machine Learning',
            description:
                'Nous offrons des services de mod�lisation pr�dictive, analyse de donn�es et cr�ation de mod�les d\'apprentissage automatique pour r�soudre des probl�mes complexes.',
        },
        {
            title: 'Data Engineering & Pipelines',
            description:
                'Optimisation de flux de donn�es, gestion des pipelines ETL, et int�gration avec des syst�mes d\'entreprise pour automatiser les processus de donn�es.',
        },
        {
            title: 'Business Intelligence',
            description:
                'Cr�ation de dashboards interactifs et de rapports Power BI pour transformer les donn�es en insights d�cisionnels � l\'aide de visualisations claires et dynamiques.',
        },
        {
            title: 'Consulting Cloud & Azure',
            description:
                'Nous aidons � la migration vers le cloud, � la mise en place de solutions Azure, ainsi qu�� l�optimisation de l\'infrastructure cloud pour des performances optimales.',
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
