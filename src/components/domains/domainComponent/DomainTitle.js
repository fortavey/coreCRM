import React from "react";
import colors from "../../../data/colors";

export default function DomainTitle({domain}) {
    const renderLinkForDomain = () => {
        return domain.hosting ? "" : "/installer.php";
    };

    return (
        <a
            href={`https://${domain.title}${renderLinkForDomain()}`}
            style={styles.title_a}
            target="_blank"
        >
            {domain.title.split('?')[0]}
        </a>
    );
}

const styles = {
    title_a: {
        color: colors.darkGrey,
    },
};
