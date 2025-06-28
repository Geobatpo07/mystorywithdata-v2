import { FaRegUser, FaGraduationCap, FaBriefcase, FaToolbox, FaCog } from 'react-icons/fa'
import AboutCard from '../components/AboutCard'
import AboutListSection from '../components/AboutListSection'

export default function About() {
    return (
        <div className="container-fluid px-3 px-md-5 mt-5">
            <h1 className="text-center mb-5">À propos de moi</h1>
            <div className="row gy-4">

                <AboutCard
                    icon={<FaRegUser className="text-primary me-2" />}
                    title="Bonjour, je suis Geovany Batista Polo LAGUERRE"
                >
                    <p>
                        Passionné par les données et la modélisation mathématique, je suis un professionnel en Data Science et en ingénierie des données. Avec un parcours en Mathématiques et Applications, mon expertise se situe à la croisée des chemins entre l’analyse de données, la modélisation prédictive et les technologies cloud.
                    </p>
                    <p>
                        Mon objectif est d’utiliser les données pour résoudre des problèmes complexes et apporter des solutions innovantes dans des domaines variés comme l’optimisation, l’analyse des comportements et l’automatisation des processus décisionnels.
                    </p>
                </AboutCard>

                <div className="col-md-6">
                    <AboutCard
                        icon={<FaGraduationCap className="text-success me-2" />}
                        title="Mon Parcours Académique"
                    >
                        <p>
                            J’ai fait un Master en Mathématiques et Applications, spécialité Modélisation et Outils d’Aide à la Décision, à l’Université des Antilles. J’ai développé une solide base théorique en mathématiques appliquées, ainsi qu’en modélisation statistique et en apprentissage automatique.
                        </p>
                    </AboutCard>
                </div>

                <div className="col-md-6">
                    <AboutCard
                        icon={<FaBriefcase className="text-warning me-2" />}
                        title="Mon Expérience Professionnelle"
                    >
                        <p>
                            En tant qu'Analytics Engineer, j'ai eu l’opportunité de travailler sur des projets d'ingénierie des données, en utilisant des outils comme Microsoft Fabric, Azure et Databricks. J’ai créé des pipelines, des dashboards Power BI, et des architectures de données cloud performantes.
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
                            "Adaptabilité aux changements et nouvelles technologies.",
                            "Travail d’équipe et collaboration interdisciplinaire.",
                            "Autonomie et gestion efficace du temps.",
                            "Curiosité et apprentissage continu."
                        ]}
                    />
                </AboutCard>

                <AboutCard
                    icon={<FaToolbox className="text-danger me-2" />}
                    title="Mes Compétences Techniques"
                >
                    <AboutListSection
                        items={[
                            "Machine Learning : régression, classification, RNN, DQN.",
                            "Data Engineering : Azure, Databricks, Fabric, ETL/ELT.",
                            "Power BI : dashboards dynamiques et automatisés.",
                            "Programmation : Python, R, SQL, OpenCV.",
                            "Modélisation prédictive et optimisation.",
                            "Architecture de systèmes et gestion de données cloud."
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
                                <li>Analyse avancée de données et rigueur technique.</li>
                                <li>Autonomie et sens des responsabilités.</li>
                                <li>Compétences transverses entre Data Science & Cloud.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h6><strong>Faiblesses :</strong></h6>
                            <ul>
                                <li>Perfectionnisme qui peut ralentir l’exécution.</li>
                                <li>Charge mentale en cas de multi-projets.</li>
                                <li>Besoin de temps pour maîtriser de nouveaux outils.</li>
                            </ul>
                        </div>
                    </div>
                </AboutCard>
            </div>
        </div>
    );
}
