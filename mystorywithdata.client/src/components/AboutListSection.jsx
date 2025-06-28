import React from "react";
import PropTypes from "prop-types";

export default function AboutListSection({ items }) {
    return (
        <ul className="list-unstyled mb-0">
            {items.map((item, index) => (
                <li key={index} className="d-flex align-items-start mb-2">
                    <span className="me-2 text-primary fs-5">•</span>
                    <span className="text-dark">{item}</span>
                </li>
            ))}
        </ul>
    );
}

AboutListSection.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};
