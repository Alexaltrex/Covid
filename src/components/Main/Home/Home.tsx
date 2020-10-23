import React, {ReactElement} from 'react';
import {Typography} from "@material-ui/core";
import {translate} from "../../../helpers/translate";
import {HomePropsType} from "./HomeContainer";

const Home: React.FC<HomePropsType> = (props: HomePropsType): ReactElement => {
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
