import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CopyComponent = ({domain}) => {
    const [colorSite, setColorSite] = useState('grey')
    const [colorDB, setColorDB] = useState('grey')

    const clickOnSite = () => {
        setColorSite('#30d130')
        navigator.clipboard.writeText(domain.title)
    }

    const clickOnDatabase = () => {
        setColorDB('#30d130')
        navigator.clipboard.writeText(domain.title.split('.')[0])
    }

    return <div style={styles.cont}>
        <div style={styles.developerName}>{domain.title.split('?')[1]}</div>
        <FontAwesomeIcon color={colorSite} icon={'clone'} onClick={clickOnSite}/>
    </div>
}

const styles = {
    cont: {
        alignSelf: 'flex-end',
        marginLeft: 'auto',
        color: 'grey',
        cursor: 'pointer',
        width: 50,
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 20
    },
    developerName: {
        fontSize: 10
    }
}

export default CopyComponent
