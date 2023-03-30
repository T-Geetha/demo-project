import React, { useState } from "react";
import "./EditUser.css";
import { EditUserService } from "./EditUserService";
import { styled } from '@mui/material/styles';
import { editUserInformation, getEditUserAsync } from "../../Redux/EditUser/EditUserSlice";
import { TextField,
  FormHelperText,
  Autocomplete, 
   Alert, 
   Snackbar, 
   Box, 
   Button, 
   Card, 
   Grid, 
   Container,
   FormControl, 
   Dialog,
   DialogActions,
   DialogTitle,
   DialogContent,
   DialogContentText,
   
     } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
//import { useHistory } from "react-router";
import {useNavigate} from 'react-router-dom';
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveIcon from '@mui/icons-material/Save';

function EditUserInformation(props) {

  //const history = useHistory();
  const navigate = useNavigate();
  let snack = 0;
  let userId = 1;
  if (props && props.id) { userId = props.id };

  const edituserdata = useSelector((state) => state.edituserdata);

  var editUser = edituserdata.userInformation

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEditUserAsync(userId));
  }, [dispatch]);

  const [deactivateDialog, setDeactivateDialog] = React.useState(false);
  const handleDeactivateDialogClose = () => { setDeactivateDialog(false); };
  const [openDeactivateSnack, setOpenDeactivateSnack] = useState(!!snack);
  const handleDeactivateSnackClose = () => {
    setOpenDeactivateSnack(false);
  }
  const [id, setId] = useState(editUser.id);
  const [name, setName] = useState(editUser.name);
  const [email, setEmail] = useState(editUser.email);
  const [designation, setDesignation] = useState(editUser.designation);
  const [unit, setUnit] = useState(editUser.unit);
  
  const editUserService = new EditUserService();
  const designationoptions = editUserService.designationtypes();
  const unitoptions = editUserService.unittypes();
    
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const handleClick = (e) => {
    return null;
  };
  const handleMenuItemClick = (event) => {
    setOpen(false);
    setDeactivateDialog(true)
  };

 

  const handleToggle = (e) => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(editUserInformation(
      {
        id: data.userid,
        name: data.name,
        email: data.email,
        designation: data.designation,
        unit: data.unit

      }
    ));
    
  };
 
  return (
    <div>
      <Container>
        <form>
          <Card  >
            <div className="header"></div>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
              <p className="title">User Information</p>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="grid-container">
                  <div className="label-style required">UserID</div>
                  <Controller
                    name="userId"
                    rules={{ required: "Please key a ID" }}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={userId}
                            variant="outlined"
                            id="select-id"
                            error={errors.userId ? true : false}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="grid-container">
                  <div className="label-style required">Name</div>
                  <Controller
                    name="name"
                    rules={{ required: "Please key the name" }}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={editUser.name}
                            onChange={e => {
                              onChange(e);
                              setName(e.target.value)
                            }}
                            variant="outlined"
                            id="select-name"
                            error={errors.name ? true : false}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="grid-container">
                  <div className="label-style required" >Email</div>
                  <Controller
                    name="email"
                    rules={{ required: "Please key the email" }}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <FormControl fullWidth>
                          <TextField
                            fullWidth
                            value={editUser.email}
                            onChange={e => {
                              onChange(e);
                              setEmail(e.target.value)
                            }}
                            variant="outlined"
                            id="select-email"
                            error={errors.email ? true : false}
                          />
                        </FormControl>
                      );
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} >
              <Grid item xs={6} >
                <Box className="grid-container" >
                  <div className="label-style required">Designation</div>
                  
                  <Controller
                name="designation"
                rules={{ required: "Please choose a user group" }}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <Autocomplete
                      value={editUser.designation}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        setDesignation(newValue);
                        
                      }}
                      options={designationoptions}
                      getOptionLabel={(x) => x.name}
                      renderInput={(params) => <TextField {...params} error={errors.designation ? true : false} />}
                    />
                  );
                }}
              />
                        
                        
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box className="grid-container">
                  <div className="label-style required">CO / PA Unit</div>
                  <Controller
                            name="unit"
                            rules={{ required: "Please choose a unit" }}
                            control={control}
                            //defaultValue={unit}
                            render={({ field: { value, onChange } }) => {
                                return (
                                    <Autocomplete
                                    value={editUser.unit}
                                    onChange={(event, newValue) => {
                                      onChange(newValue);
                                      setUnit(newValue);
                                      
                                    }}
                                        options={unitoptions}
                                        getOptionLabel={(x) => x.name}
                                        renderInput={(params) => <TextField {...params} error={errors.unit ? true : false} />}
                                    />
                                );
                            }}
                        />
                                      
                  <ErrorMessage
                            errors={errors}
                            name="unit"
                            render={({ message }) => (
                                <FormHelperText error>{message}</FormHelperText>
                            )}
                        />
                </Box>
              </Grid>
            </Grid>
          </Card>

        </form>

      </Container>
      <Container style={{ marginTop: "64px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className="btn-container">
              <Button
                className="edituser-nextbutton" style={{ marginBottom: "64px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setDeactivateDialog(true)
                }}>
                Deactivate User
              </Button>

            </Box>
          </Grid>
        </Grid>
        <Dialog
          open={deactivateDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="popup-container"
          maxWidth="md"
        >
          <div className="header" />
          <DialogTitle className="popup-dialog-title"  >
            <div className="popup-title">
              Are you sure want to deactivate this user?
            </div>
          </DialogTitle>
          <DialogContent>
            <DialogContentText className="popup-content-text">
              <strong>
                Deactivating this user will no longer allow the user to acess the intranet system.
              </strong>
            <br/>
            <br/>
              Please ensure that this action is correct.
            </DialogContentText>  
          </DialogContent>
          <DialogActions className="popup-button-box">
            <Button className="outlined-button" 
              onClick={(e) => {
              e.preventDefault();
              handleDeactivateDialogClose();
            }}>
             Cancel
            </Button>
            <Button
            style={{ padding: "20px" }}
              className="edituser-nextbutton"
              variant="contained"
              onClick={(e) => {
                dispatch(
                  //getDeactivateUserAysnc(userId)                  
                );
                setDeactivateDialog(false);
                // history.push({
                //   pathname: '/ViewUser',
                //   state: { id: userId,
                //   status: "deactivated"}
                //  })           
              }} >
                Deactivate
            </Button>

            {/* Snackbar */}
            <Snackbar
              open={openDeactivateSnack}
              autoHideDuration={6000}
              onClose={handleDeactivateSnackClose}
            >
              <Alert onClose={handleDeactivateSnackClose}  icon={<CheckCircleOutlinedIcon sx={{ color: "white" }} />}
             className="snackbar-style-global success-snackbar"
            >User has been sucessfully deactivated.</Alert>
            </Snackbar>
          </DialogActions>
        </Dialog>

      </Container>

      <div className="header-footer"></div>
      <Container>
        <Box className="footer-box">
          <Box sx={{
            backgroundColor: "white",
            paddingY: 4,
            paddingX: 4,
           marginRight: 50,
          }}>

            <Button           
              
              className="edituser-nextbutton"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}

            >
              Next
            </Button>
            <Button
            style={{ marginLeft: "64px" }}
              disableElevation
              variant="contained"
              className="submit-button"
              //onClick={handleSubmit(onSubmit)}
              startIcon={<SaveIcon className="save-icon" />}
            >Save</Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
export default EditUserInformation;
