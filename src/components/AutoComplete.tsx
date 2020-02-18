import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default (props: any) => {
    const {
        metrics,
        onMetricsChangeHandler
    } = props;
    return (
        <Autocomplete
          multiple
          id="tags-standard"
          options={metrics}
          onChange={onMetricsChangeHandler}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="" 
              placeholder="Select"
              fullWidth
            />
          )}
        />
    );
  };
