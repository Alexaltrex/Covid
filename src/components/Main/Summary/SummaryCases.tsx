import React, {ReactElement} from 'react';
import SummaryCasesItem from "./SummaryCasesItem";
import {CountryCasesType, LangType} from "../../../types/types";
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {translate} from "../../../helpers/translate";


const SummaryCases: React.FC<PropsType> = (props: PropsType): ReactElement => {
    const {cases, lang} = props;

    const color = ['darkred', 'darkred', 'darkblue', 'darkblue', 'darkgreen', 'darkgreen'];
    const caseType = [
        translate(lang, 'Confirmed new'),
        translate(lang, 'Confirmed total'),
        translate(lang, 'Deaths new'),
        translate(lang, 'Deaths total'),
        translate(lang, 'Recovered new'),
        translate(lang, 'Recovered total')
    ];
    const icons = [
        <LocalHospitalIcon/>, <LocalHospitalIcon/>,
        <HighlightOffIcon/>, <HighlightOffIcon/>,
        <FavoriteIcon/>, <FavoriteIcon/>
    ];

    const summaryKeys = cases && Object.keys(cases);
    const SummaryCasesElements = cases && summaryKeys &&
        summaryKeys.map((key, i) => <SummaryCasesItem key={key}
                                                      value={cases[key as keyof CountryCasesType]}
                                                      color={color[i]}
                                                      caseType={caseType[i]}
                                                      icon={icons[i]}
            />
        );

    return (
        <div>
            {SummaryCasesElements}
        </div>
    )
};

export default SummaryCases;

//===================== TYPE =================
type PropsType = {
    cases: null | CountryCasesType
    lang: LangType
}