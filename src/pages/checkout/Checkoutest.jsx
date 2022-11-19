import { useNavigate } from 'react-router-dom';
import React, {   useEffect, useState } from 'react'
import './Checkout.css'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button1 from 'react-bootstrap/Button';
import { useUserAuth } from '../../context/UserAuthContext';



const Checkoutest = ({cart, setCart}) => {
  const navigate = useNavigate();
  let { user } =  useUserAuth();
  const [isContainerActive, setIsContainerActive] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [trxid, setTrxid] = useState('');
  const [formfillup, setFormfillup] = useState(false);
  const [radio, setRadio] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(`test`)
   handleNext()
  };

  


 
  const total = cart.reduce((total, prd) => total + prd.price * prd.abc , 0)

  const createOrder = (e) => {
    e.preventDefault();

    /////cart item find
    const cartItems = cart.map((cart) => `{'product_id': ${cart.id},'quantity': ${cart.abc}}` );
  const StringCart= JSON.stringify(cartItems);  
  const newItms = StringCart.replace (/"/g,'');
  const newCart = newItms.replace (/'/g,'"');
  setIsContainerActive(true);

    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

   const body1 = `{"payment_method":"cod","payment_method_title":"Cash On Delivery","customer_note":"hello","transaction_id":"12345","billing":{"first_name":"${name}","address_1":"${address}","phone":"${phone}","email":"test1@gmail.com"},"line_items":`
  const body2= `${newCart}}`
      const body3 = body1.concat(' ', body2);
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: body1.concat(' ', body2),
        redirect: 'follow'
      };
      fetch(`https://shop.abusayeeed.xyz/wp/wp-json/wc/v3/orders?${process.env.REACT_APP_KEY}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          const rslt = result;
          console.log(rslt)
          navigate(`/order/${rslt.number}`)      
          setCart([]) 
          localStorage.removeItem('shopping_cart');
          })
        .catch(error => {
          const rslt = error;
          console.log('error', rslt)
          setSomethingWentWrong(true)
        });
        
      console.log(body3)
  }
 
   
  const steps = [
    {
      label: 'Personal Information',
      description:   
      <div> 
    
           

    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="Name" >
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control   required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}  />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="address">
        <Form.Label column sm="2">
          Address
        </Form.Label>
        <Col sm="10">
          <Form.Control required placeholder="Address"  value={address} onChange={(e) => setAddress(e.target.value)} />
        </Col>
      </Form.Group>


      <Form.Group as={Row} className="mb-3" controlId="phone">
        <Form.Label column sm="2">
         Phone
        </Form.Label>
        <Col sm="10">
          <Form.Control required placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}  />
        </Col>
      </Form.Group>

      <Button1 variant="warning" type="submit">Continue</Button1>

    </Form>
       </div>
   
    },
    {
      label: 'Payment Options',
      description:
      <div>
    




    <div className="form-check">
  <input className="form-check-input" onClick={()=>setRadio(false)} type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
  <label className="form-check-label" htmlFor="flexRadioDefault1" >
    Cash On Delivery
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" onClick={()=>setRadio(true)} type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label className="form-check-label"  htmlFor="flexRadioDefault2">
   Bkash
  </label>
</div>
    
{!radio  && <div>
<Form onSubmit={createOrder}>
  
      <Button1 variant="warning" type="submit">Checkout</Button1></Form>
 </div>  }

{radio  &&  <div><p>Bkash Number: 01861389963</p>
<Form onSubmit={createOrder}>
    <Form.Group as={Row} className="mb-3" controlId="trxid">
        <Form.Label >
         Transaction Number
        </Form.Label>
        <Col sm="10">
          <Form.Control required placeholder="trxid" value={trxid} onChange={(e) => setTrxid(e.target.value)}  />
        </Col>
        
      </Form.Group>
      <Button1 variant="warning" type="submit">Checkout</Button1></Form>
 </div>  }

           </div>,
    },
  ];
  useEffect(() => {
  
   if (user){ 
    console.log(user.displayName)
    setName(user.displayName)}
    }, [])
  return (
    
    <div className='mt-50 container' >
       <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <div>{step.description}</div>
              <Box sx={{ mb: 2 }}>
                <div>
              
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                  
                  

                </div>
                
              </Box>
            </StepContent>
          </Step>
        ))}
      
      </Stepper>
     
    </Box>
      
    <h1>{total}</h1>   
  
  
{isContainerActive ? <h3 className="head">Thank You For Your Order.</h3> : ""}
{somethingWentWrong ? <h3 className="head">somthing went wrong</h3> : ""}



    </div>
  )
}

export default Checkoutest
