import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import './login.css';
import {Grid, Button,Box, Paper, Typography,TextField, Checkbox, Link ,FormControl,FormHelperText, FormControlLabel} from '@mui/material'
function Login(){
    const paperStyle={padding :'30px', hight: '60vh', width: 300, margin: "30px auto"}
    //react hook form
    const {handleSubmit, control, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }   
       
    return (
        <Grid>
            <Paper style={paperStyle} elevation={10}>
                
                <Typography align="center" variant="h4">Sign in</Typography>
                <div style={{ marginLeft: 30 }} >
                    
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 3 }}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Please enter your email!" ,
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                              }
                        
                        }}
                        render={({ field: { value, onChange } }) => (
                            <div>
                                <Typography >Email</Typography>
                                <FormControl>
                                     <TextField
                                        type="email"
                                        fullWidth
                                        placeholder="Enter your email"
                                        value={value}
                                        onChange={onChange}
                                        error={errors.email ? true : false}
                                    />
                                </FormControl>
                            </div>
                        )}
                    />
                    {errors.email && (
                        <FormHelperText className="error-text" role="alert">
                            {errors.email.message}
                        </FormHelperText>
                    )}                                 
                        
                   </Box>

                    <Box sx={{ mb: 3 }}>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Please enter your password!",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
                                    message:
                                        "Password must be 8-20 characters, contain lower and uppercase letters and numbers.",
                                },
                            }}
                            render={({ field: { value, onChange } }) => (
                                <div>
                                    <Typography >Password</Typography>
                                    <FormControl>
                                        <TextField
                                            
                                            fullWidth
                                            placeholder='Enter Password'
                                            value={value}
                                            onChange={onChange}
                                            type="password"
                                            error={errors.password ? true : false}
                                        />
                                    </FormControl>
                                </div>
                            )}
                        />
                        {errors.password && (
                            <FormHelperText className='error-text' role="alert">
                                {errors.password.message}
                            </FormHelperText>
                        )}
                    </Box>
                    <Box sx={{ mb: 3 }}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                type="checkbox"                
                                color="primary"
                            />
                            }
                        label="Remember me"
                        />
                    </Box>
                    
                    <Button type='submit' variant="contained" color='primary'>Login</Button>
                    <Box sx={{ mb: 3,mt:3 }}>
                        <Typography > Need an account ?
                            <Link href="/Register/">
                                Sign Up 
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </div>
        </Paper>
        </Grid>
    )
}
export default Login;