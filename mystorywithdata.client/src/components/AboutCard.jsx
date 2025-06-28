import React from "react";
import PropTypes from "prop-types";

export default function AboutCard({ title, icon, description, children }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 mb-4 flex items-start gap-4 hover:shadow-lg transition-shadow">
            <div className="text-2xl text-blue-600">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                {description && <p className="text-gray-600 text-sm mb-2">{description}</p>}
                {children}
            </div>
        </div>
    );
}

AboutCard.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    description: PropTypes.string,
    children: PropTypes.node,
};

AboutCard.defaultProps = {
    description: "",
    children: null,
};
