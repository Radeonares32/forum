import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export const Signin = () => {
    return (
        <div className="col-md-5 mt-5">
             
        <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
       
       
       
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      </div>
    )
} 