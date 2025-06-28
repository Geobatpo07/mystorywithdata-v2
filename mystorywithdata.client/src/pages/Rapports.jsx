import './Rapports.css'

export default function Rapports() {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Rapports Power BI</h1>
            <p className="text-center mb-4">
                Retrouvez ici les rapports interactifs cr��s � partir de mes projets en Data Science et Business Intelligence.
            </p>

            {/* Exemple de carte pour un rapport */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Analyse du Churn Client</h5>
                            <p className="card-text">Un rapport d�taill� illustrant les pr�dictions de d�part de clients � l�aide de mod�les de Machine Learning.</p>
                            {/* Exemple Power BI embed (� remplacer par un vrai lien plus tard) */}
                            <div className="ratio ratio-16x9">
                                <iframe
                                    title="Rapport Power BI - Churn Client"
                                    src="https://app.powerbi.com/view?r=EXEMPLEDELIEN"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
