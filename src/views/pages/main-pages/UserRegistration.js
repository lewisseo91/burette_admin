import React from 'react';
import { FormControl, Grid, InputLabel, Input, FormHelperText, Button, Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';
import useAsync from '../../../hooks/useAsync';

// https://codesandbox.io/s/react-material-ui-form-submit-v40lz?from-embed=&file=/src/components/MaterialUIFormSubmit.js:954-963 이거 꼭 참고


async function postUser(data) {
  const response = await axios.post(
    'http://localhost:8091/user/create',
    data
  );
  return response.data;
}

const UserRegistration = () => {
    const [state, setState] = React.useState({userId : "", password: "", nickname : "", email: "", birth: new Date(), phoneNumber: ""});

    const onChangeId = (e) => {
      setState({...state, userId : e.target.value });
    }

    const onChangePassword = (e) => {
      setState({...state, password : e.target.value });
    }

    const onChangeNickname = (e) => {
      setState({...state, nickname : e.target.value });
    }

    const onChangeEmail = (e) => {
      setState({...state, email : e.target.value });
    }
    
    const onChangeBirth = (dateValue) => {
      setState({...state, birth : dateValue });
    }

    const onChangePhone = (e) => {
      setState({...state, phoneNumber : e.target.value });
    }

    const onSubmit = async (e) => {
      // console.log("on submit");
      // refetch();
      console.log(state);
      try {
        let result = await postUser(state);
        console.log(result);
      } catch (e) {
        console.log("error : %s", e);
      }
    }

    return (
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12}>
                <FormControl fullWidth sx={ {mt : 1} }>
                  <InputLabel htmlFor="user-id">Id</InputLabel>
                  <Input autoFocus id="user-id" aria-describedby="user-id-text" value={state.userId} onChange={onChangeId} />
                  {/* <FormHelperText id="user-id-text">We'll never share your id.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth sx={ {mt : 3} }>
                  <InputLabel htmlFor="user-password">Password</InputLabel>
                  <Input id="user-password" type="password" aria-describedby="user-password-text" value={state.password}  onChange={onChangePassword} />
                  {/* <FormHelperText id="user-password-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth sx={ {mt : 3} }>
                  <InputLabel htmlFor="user-nickname">nickname</InputLabel>
                  <Input id="user-nickname" aria-describedby="user-nickname-text" value={state.nickname}  onChange={onChangeNickname} />
                  {/* <FormHelperText id="intro-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth sx={ {mt : 3} }>
                  <InputLabel htmlFor="user-email">email</InputLabel>
                  <Input id="user-email" aria-describedby="user-email-text" value={state.email}  onChange={onChangeEmail} />
                  {/* <FormHelperText id="intro-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth sx={ {mt : 3} }>
                  <InputLabel htmlFor="user-phone">phone</InputLabel>
                  <Input id="user-phone" aria-describedby="user-phone-text" value={state.phone}  onChange={onChangePhone} />
                  {/* <FormHelperText id="intro-text">We'll never share your email.</FormHelperText> */}
                </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box sx={ {mt: 3} }>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="생일"
                    value={state.birth}
                    onChange={onChangeBirth}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={ {mt: 3} }>
                <Button onClick={onSubmit} >제출</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
    );
};

export default UserRegistration;
