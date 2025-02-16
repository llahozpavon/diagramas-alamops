import React, { useState } from "react";
import {
    FormControl,
    InputAdornment,
    TextField,
    createStyles,
    makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: "0"
        }
    });
});

const SearchInput   = ({setSearchQuery}) => {
    const { search } = useStyles();

    return (
            <FormControl className={search}>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder={'Buscar'}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </FormControl>
    );
};

export default SearchInput;
