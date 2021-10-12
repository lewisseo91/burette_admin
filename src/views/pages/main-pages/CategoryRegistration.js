import React, { useState } from 'react';
import { FormControl, Grid, InputLabel, Input, FormHelperText, Button, Box } from '@material-ui/core';
import axios from 'axios';

async function postCategory(data) {
  // 예제
  const config = {
    headers: { Authorization : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxMjMxMjMiLCJpYXQiOjE2MzI1NzkxMDMsImV4cCI6MTYzNTE3MTEwM30.FZmVZfC3H_IFtbTGALV6559Igt0EVLNvxLnwzuK9u48'}
  }

  const response = await axios.post(
    'http://localhost:8090/category/create',
    data,
    config
  );

  return response.data;
}

const CategoryRegistration = () => {
  const [state, setState] = useState({name : ""});

  const onChangeName = (e) => {
    setState({...state, name : e.target.value});
  }

  const onSubmit = async () => {
    const data = {name: state.name};
    let result = await postCategory(data);
    console.log(result);
    // console.log(state);
    // console.log(hashtags);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
          <FormControl fullWidth sx={ {mt : 1} }>
            <InputLabel htmlFor="category-name">category name</InputLabel>
            <Input autoFocus id="category-name" aria-describedby="category-name-text" value={state.name} onChange={onChangeName} />
            {/* <FormHelperText id="user-id-text">We'll never share your id.</FormHelperText> */}
          </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Box sx={ {mt: 3} }>
        </Box>
        {/* 프리뷰 공간  */}
        {/* <Box sx={ {mt: 3} }>
          <div>
              {parse(previewState.previewHtml)}
          </div>
        </Box> */}
        <Box sx={ {mt: 3} }>
          <Button onClick={onSubmit} >제출</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CategoryRegistration;