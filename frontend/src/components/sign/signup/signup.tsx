import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const Signup = () =>{
    return (
        
        <div className="col-md-5 mt-5">
             
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nick</Form.Label>
          <Form.Control type="text" placeholder="Nickname" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="dob" className="mb-3">
          <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
        </Form.Group>
        <Form.Group controlId="dob" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select aria-label="Default select example">
                <option>Gender</option>
                <option value="1">Male</option>
                <option value="2">Famale</option>
                <option value="3">Other</option>
    </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
          password is at least 8 characters
at least one capital letter
a lowercase letter
must contain numbers.
        </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password Repeat</Form.Label>
          <Form.Control type="password" placeholder="Password repeat" />
          <Form.Text className="text-muted">
          password is at least 8 characters
at least one capital letter
a lowercase letter
must contain numbers.
        </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      </div>
     
    )
}