import React from 'react';
import { FormControl, Grid, InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
// https://codesandbox.io/s/react-material-ui-form-submit-v40lz?from-embed=&file=/src/components/MaterialUIFormSubmit.js:954-963 이거 꼭 참고

const UserRegistration = () => {
    const [state, setState] = React.useState({id : "ex_id", password: "a123", intro: "abcd"});

    const onChangeId = (e) => {
      setState({...state, id :e.target.value });
    }

    const onChangePassword = (e) => {
      setState({...state, password :e.target.value });
    }

    const onChangeIntro = (e) => {
      setState({...state, intro :e.target.value });
    }

    const onSubmit = (e) => {
      console.log(e.target);
      console.log(state);
      console.log("on submit");
    }

    return (
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="user-id">Id</InputLabel>
                  <Input autoFocus id="user-id" aria-describedby="user-id-text" value={state.id} onChange={onChangeId} />
                  {/* <FormHelperText id="user-id-text">We'll never share your id.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="user-password">Password</InputLabel>
                  <Input id="user-password" aria-describedby="user-password-text" value={state.password}  onChange={onChangePassword} />
                  <FormHelperText id="user-password-text">We'll never share your email.</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="user-intro">Intro</InputLabel>
                  <Input id="user-intro" aria-describedby="intro-text" value={state.intro}  onChange={onChangeIntro} />
                  <FormHelperText id="intro-text">We'll never share your email.</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={onSubmit} >제출</Button>
            </Grid>
          </Grid>
        </form>
    );
};

export default UserRegistration;
