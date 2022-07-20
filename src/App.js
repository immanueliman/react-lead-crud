import React, { useState } from 'react'
import "./index.css"
import { FaEdit, FaTrash } from 'react-icons/fa';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditAdd from './EditAdd';
import { Button, Container, Offcanvas } from 'react-bootstrap';  

console.log("rerender")

const data = JSON.parse(localStorage.getItem("react-client-data"));




function App() {
  const [list,setList] = useState(data)
  const [model,setModel] = useState()
  const [state,setState] = useState(true)
  const [editvalues, setEditvalues] =useState()
  const [editIndex,setEditIndex] = useState(null)
  const [show, setShow] = useState(false);  
  const closeSidebar = () => setShow(false);  
  const showSidebar = () => setShow(true);  
  
  const editfun = (e,index) =>{
    e.preventDefault();
    setEditIndex(index)
    let editemp = JSON.parse(localStorage.getItem("react-client-data"));
    let newEditTemp = editemp[index]
    setEditvalues(newEditTemp)
    setModel(true)
  }

  const editing = (event,status,source, name, number, mail,editIndex)=>{
    event.preventDefault()
    function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join('/');
    }
    
    // 👇️ 24/10/2021 (mm/dd/yyyy)
    let date = formatDate(new Date());
    let tempList = list;
    tempList[editIndex][0] = date;
    tempList[editIndex][1] = name;
    tempList[editIndex][2] = number;
    tempList[editIndex][3] = mail;
    tempList[editIndex][4] = source;
    tempList[editIndex][5] = status
    localStorage.setItem("react-client-data",JSON.stringify(tempList))
    setState(!state)
    setModel(false)
  }

  const addfun = () =>{
    setModel(true)
  }

  const close = ()=>{
    setModel(false)
  }

  const deletefun = (e,index) => {
    e.preventDefault();
    console.log("this is delete")
    let del = JSON.parse(localStorage.getItem("react-client-data"));
    let delarr = Array.from(del)
    if(delarr.length <= 1 ){
      localStorage.removeItem("react-client-data")
      setList(null)
      setState(!state)
    }
    else{
      let temp = del.filter((item,inn)=>{
      return inn!==index
      })
      localStorage.setItem("react-client-data",JSON.stringify(temp))
      setList(temp)
      setState(!state)
    }     
  }

  const adding = (event,status,source,name,number,email)=>{
    event.preventDefault();

      function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
      
      // 👇️ 24/10/2021 (mm/dd/yyyy)
      let date = formatDate(new Date());

      let arr = [date,name,number,email,source,status]
      if(list===null){
        let newlist = [arr]
        localStorage.setItem("react-client-data",JSON.stringify(newlist))
        setList([arr])
      }
      else{ 
        let newlist = [...list,arr]
        localStorage.setItem("react-client-data",JSON.stringify(newlist))
        setList([...list,arr]) 
      }
      
      setState(!state)
      setModel(false)
    
  }



  if(list!==null){

  
   
  return (
    <div>
      <div className='slidebar'>
      <Container className='p-4'>  
      <Button variant="primary" onClick={showSidebar}>  
        Launch Sidebar  
      </Button>  
      <Offcanvas show={show} onHide={closeSidebar}>  
        <Offcanvas.Header closeButton>  
          <Offcanvas.Title>Sidebar Title</Offcanvas.Title>  
        </Offcanvas.Header>  
        <Offcanvas.Body>  
          <ul>
            <li>home</li>
            <li>lead</li>
            <li>about</li>
            </ul>  
        </Offcanvas.Body>  
      </Offcanvas>  
      </Container>  
      </div>
      <div className='section'>
      <Table striped bordered hover variant='dark' size="lg" >
        <tbody>
          <tr>
            <th>Lead Date</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {list.map((row,index)=>{
            return (<tr key={index}>
              {row.map((columns,index)=>{
                return(
                  <td key={index}>{columns}</td>
                )
              })}
              <td onClick={(e)=>editfun(e,index)}><FaEdit/></td>
              <td onClick={(e)=>deletefun(e,index)}><FaTrash/></td>
            </tr>)
           
          })}
        </tbody>
        
      </Table>
      <div className='add text-center'>
          <button className='btn btn-secondary' onClick={editfun}>Add lead</button>
        </div>
        <EditAdd model = {model} close={close} adding={adding} editvalues = {editvalues} editIndex={editIndex} editing={editing}/>
    </div>
    </div>
  )
   }
   else{
    return( 
    <div>
      <h4>No data please add atleast one </h4>
      <div className='add text-center'>
          <button className='btn btn-secondary' onClick={addfun}>Add lead</button>
        
        <EditAdd model = {model} close={close} adding={adding} />
      </div>
    </div>
    )
      
   }
}


export default App
