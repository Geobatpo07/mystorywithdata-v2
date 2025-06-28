import { FaRegUser, FaGraduationCap, FaBriefcase, FaToolbox, FaCog } from 'react-icons/fa'
import AboutCard from '../components/AboutCard'
import AboutListSection from '../components/AboutListSection'

export default function About() {
    return (
        <div className="container-fluid px-3 px-md-5 mt-5">
            <h1 className="text-center mb-5">� propos de moi</h1>
            <div className="row gy-4">

                <AboutCard
                    icon={<FaRegUser className="text-primary me-2" />}
                    title="Bonjour, je suis Geovany Batista Polo LAGUERRE"
                >
                    <p>
                        Passionn� par les donn�es et la mod�lisation math�matique, je suis un professionnel en Data Science et en ing�nierie des donn�es. Avec un parcours en Math�matiques et Applications, mon expertise se situe � la crois�e des chemins entre l�analyse de donn�es, la mod�lisation pr�dictive et les technologies cloud.
                    </p>
                    <p>
                        Mon objectif est d�utiliser les donn�es pour r�soudre des probl�mes complexes et apporter des solutions innovantes dans des domaines vari�s comme l�optimisation, l�analyse des comportements et l�automatisation des processus d�cisionnels.
                    </p>
                </AboutCard>

                <div className="col-md-6">
                    <AboutCard
                        icon={<FaGraduationCap className="text-success me-2" />}
                        title="Mon Parcours Acad�mique"
                    >
                        <p>
                            J�ai fait un Master en Math�matiques et Applications, sp�cialit� Mod�lisation et Outils d�Aide � la D�cision, � l�Universit� des Antilles. J�ai d�velopp� une solide base th�orique en math�matiques appliqu�es, ainsi qu�en mod�lisation statistique et en apprentissage automatique.
                        </p>
                    </AboutCard>
                </div>

                <div className="col-md-6">
                    <AboutCard
                        icon={<FaBriefcase className="text-warning me-2" />}
                        title="Mon Exp�rience Professionnelle"
                    >
                        <p>
                            En tant qu'Analytics Engineer, j'ai eu l�opportunit� de travailler sur des projets d'ing�nierie des donn�es, en utilisant des outils comme Microsoft Fabric, Azure et Databricks. J�ai cr�� des pipelines, des dashboards Power BI, et des architectures de donn�es cloud performantes.
                        </p>
                    </AboutCard>
                </div>

                <AboutCard
                    icon={<FaCog className="text-info me-2" />}
                    title="Mes Soft Skills"
                >
                    <AboutListSection
                        items={[
                            "Communication claire et vulgarisation des concepts techniques.",
                            "Adaptabilit� aux changements et nouvelles technologies.",
                            "Travail d��quipe et collaboration interdisciplinaire.",
                            "Autonomie et gestion efficace du temps.",
                            "Curiosit� et apprentissage continu."
                        ]}
                    />
                </AboutCard>

                <AboutCard
                    icon={<FaToolbox className="text-danger me-2" />}
                    title="Mes Comp�tences Techniques"
                >
                    <AboutListSection
                        items={[
                            "Machine Learning : r�gression, classification, RNN, DQN.",
                            "Data Engineering : Azure, Databricks, Fabric, ETL/ELT.",
                            "Power BI : dashboards dynamiques et automatis�s.",
                            "Programmation : Python, R, SQL, OpenCV.",
                            "Mod�lisation pr�dictive et optimisation.",
                            "Architecture de syst�mes et gestion de donn�es cloud."
                        ]}
                    />
                </AboutCard>

                <AboutCard
                    icon={<FaCog className="text-primary me-2" />}
                    title="Mes Forces et Faiblesses"
                >
                    <div className="row">
                        <div className="col-md-6">
                            <h6><strong>Forces :</strong></h6>
                            <ul>
                                <li>Analyse avanc�e de donn�es et rigueur technique.</li>
                                <li>Autonomie et sens des responsabilit�s.</li>
                                <li>Comp�tences transverses entre Data Science & Cloud.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6><strong>Faiblesses :</strong></h6>
                            <ul>
                                <li>Perfectionnisme qui peut ralentir l�ex�cution.</li>
                                <li>Charge mentale en cas de multi-projets.</li>
                                <li>Besoin de temps pour ma�triser de nouveaux outils.</li>
                            </ul>
                        </div>
                    </div>
                </AboutCard>
            </div>
        </div>
    );
}
