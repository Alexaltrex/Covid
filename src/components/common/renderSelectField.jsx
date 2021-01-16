import FormControl from "@material-ui/core/FormControl";
import React from "react";
import Select from "@material-ui/core/Select";

const renderSelectField = ({
                               input,
                               label,
                               meta: {touched, error},
                               children,
                               ...custom
                           }) => {
    return (

        <FormControl error={touched && error}>
            <Select
                native
                {...input}
                {...custom}
                inputProps={{
                    name: input.name,
                    //id: 'color-native-simple'
                }}
            >
                {children}
            </Select>

        </FormControl>
    )
};

export default renderSelectField;