import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getClients, addClient } from '../../actions/clients'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import Button from "../../components/CustomButtons/Button.js";
import CardFooter from "../../components/Card/CardFooter.js";

const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    margin: '27px 0 0 0',
    paddingBottom: '10px',
  },
  formControl: {
    display: 'flex',
    margin: '27px 0 0 0',
    minWidth: 120,
    paddingBottom: '10px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Clients() {
  // const useStyles = makeStyles(styles);
  const classes = useStyles();
  const dispatch = useDispatch()
  const url = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const token = JSON.parse(localStorage.getItem('token'));
  const clients = useSelector(state => state.clients);
  const [showNew, setShowNew] = useState(true);
  const [data, setData] = useState({
    businessName: '',
    cuit: '',
    phone: '',
    altPhone: '',
    address: '',
    city: '',
    CP: '',
    bankaccount1: '',
    bankaccount2: '',
    bankaccount3: '',
    obs: ''
  });

  useEffect(() => {
    dispatch(getClients(token));
  }, [url.pathname])

  const resetForm = () => {
    setData({
      ...data,
      businessName: '',
      cuit: '',
      phone: '',
      altPhone: '',
      address: '',
      city: '',
      CP: '',
    })
  }

  const handleNewClient = () => {
    setShowNew(!showNew)
  }

  const handleChange = (event) => {
    setData({ ...data, [event.target.id]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addClient(data, token, enqueueSnackbar, closeSnackbar))
    resetForm()
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <div className={classes.card}>
              <h4 className={classes.cardTitleWhite}>Nuevo cliente</h4>
              {showNew ? null : <Button color="info" onClick={handleNewClient}>Añadir</Button>}
            </div>
          </CardHeader>
          {showNew ?
            <>
              <form onSubmit={handleSubmit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={9}>
                      <TextField
                        className={classes.input}
                        label="Razon social"
                        id="businessName"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.businessName}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <TextField
                        className={classes.input}
                        label="Cuit"
                        id="cuit"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.cuit}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.input}
                        label="Telefono"
                        id="phone"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.phone}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                        className={classes.input}
                        label="Telefono 2 (opcional)"
                        id="altPhone"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        type='number'
                        value={data.altPhone}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        className={classes.input}
                        label="Direccion"
                        id="address"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.address}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        className={classes.input}
                        label="Ciudad"
                        id="city"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.city}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        className={classes.input}
                        label="Codigo postal"
                        id="CP"
                        onChange={handleChange}
                        fullWidth
                        autoComplete='off'
                        value={data.CP}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value="hi"
          onChange={handleChange}
          // className={classes.input}
          fullWidth={true}
        >
          {/* priceList.map... */}
          <MenuItem value={0}>Ten</MenuItem>
          <MenuItem value={1}>Twenty</MenuItem>
          <MenuItem value={2}>Thirty</MenuItem>
        </Select>
      </FormControl>
                      </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      {/* <InputLabel style={{ color: "#AAAAAA" }}>Observaciones</InputLabel> */}
                      <TextField
                        className={classes.input}
                        label="Observaciones"
                        id="obs"
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        autoComplete='off'
                        value={data.obs}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button color="primary" type='submit'>Listo</Button>
                  <Button color="danger" onClick={handleNewClient}>Cancelar</Button>
                </CardFooter>
              </form>
            </>
            : null
          }
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Clientes</h4>
            <p className={classes.cardCategoryWhite}>
              Listado de clientes
            </p>
          </CardHeader>
          <CardBody>
            {clients && clients.length > 0 ?
              <Table
                tableHeaderColor="primary"
                tableHead={["Razon Social", "CUIT", "Test1", "Test2", "Test3"]}
                tableData={clients && clients.length > 0 ?
                  clients.map((client, index) => {
                    return [client.businessName, client.cuit, client.phone, client.CP]
                  })
                  : null}
              />
              : <h5 style={{ display: "flex", justifyContent: "center" }}>No existen clientes</h5>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}