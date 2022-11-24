import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { TestContext } from '../../App';
import GoogleButton from 'react-google-button'
import { async } from '@firebase/util';





const Login = () => {
  const {    setActiveTabCart, setActiveTabOrder,setActiveTabHome, setActiveTabUser} = useContext(TestContext);

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ]  = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const history = useHistory()
const location= useLocation()
 
 let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = async (e) => {
      e.preventDefault();

      try {
          await googleSignIn()
          { navigate(`/`)}
      }catch(err) {
            setError(err.message)
      }
  }
  const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
     console.log(`login`)
     try{
    await logIn(email, password);
    console.log(user)
      // navigate('/') 
      history.replace(from);
      
     }catch (err) {setError(err.message)}
 

     
    };


    useEffect(() => {


      setActiveTabCart(false)
      setActiveTabOrder(false)
      setActiveTabHome(false)
      setActiveTabUser(true) 
     if(user){ navigate(`/profile`)}
  
    })
  return (
    <div className='container margin-top'>
    <Form  onSubmit={handleSubmit}>



    <div class="input-bx">
    {error && <Alert variant='danger'>{error}</Alert>}

            <input type="text" required="required"  onChange={(e) => setEmail(e.target.value)} />
            <span>Username</span>
        </div>
        <br />
        <div class="input-bx">
            <input type="password" required="required"    onChange={(e) => setPassword(e.target.value)}/>
            <span>Password</span>
        </div>

      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address </Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
    
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"/>
      </Form.Group> */}
<div className="buttons">
      <Button  type="submit">
        LOGIN
      </Button></div>
    </Form>
    <GoogleButton onClick={ handleGoogleSignIn } />

    <Link to={'/signup'}> <h3 > sign up </h3></Link>
    </div>
  )
}

export default Login