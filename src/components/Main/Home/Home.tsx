import React, {ReactElement} from 'react';
import {Typography} from "@material-ui/core";
import {translate} from "../../../helpers/translate";
import {HomePropsType} from "./HomeContainer";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";

const Home: React.FC<HomePropsType> = (props: HomePropsType): ReactElement => {
    useCommonQueryParams();
    const {lang} = props;
    return (
        <div>
            <Typography variant='h4' align='center'>
                {translate(lang, 'Coronavirus statistic')}
            </Typography>
        </div>
    )
}
export default Home;
