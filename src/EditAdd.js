import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


function EditAdd({model,close,adding,editvalues,editIndex,editing}) {
  
 
    const [show, setShow] = useState();
    const [names,setNames]  = useState({name: "",mail:"",number:"",source:"Website",status:"New"});
    const [validated, setValidated] = useState(false);

    const {name,number,mail,source,status} = names
    
    const handleSubmit = (event,value) => {
      
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      setValidated(true);
      if(value === "add"){
      if(name!==""&&mail!=="" && number!==""){
        adding(event,status,source, name, number, mail)
        setValidated(false)
      }
    }
    if(value === "edit"){
      if(name!==""&&mail!=="" && number!==""){
      editing(event,status,source, name, number, mail,editIndex)
      setValidated(false)
      }
    }
    }

    
    useEffect(()=>{
      setShow(model)
      if(editvalues!==undefined){
        var editvaluesarr = Array.from(editvalues)  
          setNames({name:editvaluesarr[1],mail:editvaluesarr[3],number:editvaluesarr[2],source:editvaluesarr[4],status:editvaluesarr[5]})
        }
        else{
          setNames({name: "",mail:"",number:"",source:"Website",status:"New"})
        }
    },[model,editvalues])

    const handleClose = () => {
      setValidated(false)
      setShow(false)
      close()
    };
    

return (
 <div className='model'> 
    <div className='inside'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="validationCustom01" >
            <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example" name='status' onChange={(e)=>{setNames({...names, status: e.target.value})}} value={status}>
                <option value="New" >New</option>
                <option value="Startup" >Startup</option>
                <option value="MNC" >MNC</option>
              </Form.Select>
              <br></br>

            <Form.Label>Source</Form.Label>
            <Form.Select aria-label="Default select example" name='source' onChange={(e)=>{setNames({...names, source: e.target.value})}} value={source}>
              <option value="Website" >Website</option>
              <option value="Android App">Android App</option>
              <option value="IOS App" >IOS App</option>
            </Form.Select>
            <br></br>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Mr/Ms" name='name' onChange={(e)=> {setNames({...names, name: e.target.value})}} value={name} required/>
              <Form.Control.Feedback type="invalid">
                    Please choose a name.
              </Form.Control.Feedback>
            </Form.Group><br></br>

            <Form.Group className="mb-3">
              <Form.Label>Number</Form.Label>
              <Form.Control type="number" placeholder="9876543210" name='number' onChange={(e)=> {setNames({...names, number: e.target.value})}} value={number} required/>
              <Form.Control.Feedback type="invalid">
                    Please choose a number.
              </Form.Control.Feedback>
            </Form.Group><br></br>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" name='email'onChange={(e)=> {setNames({...names, mail: e.target.value})}} value={mail} required/>
              <Form.Control.Feedback type="invalid">
                    Please choose a mail.
              </Form.Control.Feedback>
            </Form.Group><br></br>
        
            {editIndex === undefined ? <Button variant="primary" type="submit" onClick={(event)=> handleSubmit(event,"add")}> Add </Button> : 
            <Button variant="primary" type="submit" onClick={(event) => handleSubmit(event,"edit")}>Edit</Button>}

       
        </Form.Group>
        </Form>

      </Modal.Body>
      </Modal>
    </div>
  
 </div>)

  
}


export default EditAdd