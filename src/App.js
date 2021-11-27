import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";
import 'font-awesome/css/font-awesome.min.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue = { 
  Id : 0,
  FirstName : '',
  LastName : '',
  Department : '',
  Supervisor : '',
  JobTitle : '',
  Branch : '',
  CreatedBy : 'Admin',
  CreatedOn : new Date().toLocaleDateString(),
  ModifiedBy : 'Admin',
  ModifiedOn : new Date().toLocaleDateString(),
  Status : 'Active'
};

const notify = (text) => toast.success(text, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  progress: undefined
  })

function App() {

  const [result, setResult] = useState([])
  const [formValue, setFormValue] = useState(initialValue);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getall();
  }, []);

  const handleChange = (e) => {
    setFormValue({
        ...formValue,
        [e.target.name] : e.target.value
    })
}

  const getall = () => {
    axios.get('/api/v1/employee/getall').then(response => {
      const {data} = response;
      const {allData} = data;
      setResult(allData);
    });
  }

  const addEmployee = (object) => {
    axios.post('/api/v1/employee/add', object).then(response => {
         setFormValue(initialValue);
         hideModal();
         getall(); 
    });
  }


  const getSingleEmployee = (Id) => {
    console.log('Id', Id);
    axios.get('/api/v1/employee/get', {'Id' : Id}).then(response => {
      debugger;
      console.log(response);
         if(response.data.status === true){
           console.log('Data',response.data.responseData);
           const result = response.data.responseData;
           setFormValue({ 
            Id : result.Id,
            FirstName : result.FirstName,
            LastName : result.LastName,
            Department : result.Department,
            Supervisor : result.Supervisor,
            JobTitle : result.JobTitle,
            Branch : result.Branch,
            CreatedBy : result.CreatedBy,
            CreatedOn : result.CreatedOn,
            ModifiedBy : result.ModifiedBy,
            ModifiedOn : result.ModifiedOn,
            Status : result.Status
          })
           setIsOpen(true);
          //notify(response.data.message);
         }
         else{
          notify(response.data.message);
         }
        
    });
  }

  const updateEmployee = (objec) => {
    
    axios.put('/api/v1/employee/update', objec).then(response => {
         setFormValue(initialValue);
         hideModal();
         getall(); 
    });
  }

  const DeleteEmployee = (Id) => {
    axios.delete('/api/v1/employee/delete', {'Id' : Id}).then(response => {
         if(response.data.status === true){
          getall(); 
          notify(response.data.message);
         }
         else{
          notify(response.data.message);
         }
        
    });
  }

  const handleClick = () => {
    addEmployee(formValue);
  }

  const handleUpdate = () =>{
    updateEmployee(formValue)
  }

  const handleDelete =(value) =>{
    DeleteEmployee(value)
  }

  const handleEdit =(value) =>{
    setIsUpdate(true)
    getSingleEmployee(value)
  }

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
   
    setIsUpdate(false);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };


  return (
    <div className="App">
  
  <div className ='tablediv'>
        <div><button onClick={showModal} className='btn btn-success'><span className="fa fa-plus"></span> Add New Employee </button></div>
        <table className="table table-stripe">
          <thead>
          <tr>
            <th> S/N </th>
            <th> Firstname </th>
            <th> Lastname </th>
            <th> Department </th>
            <th> Supervisor </th>
            <th> JobTitle </th>
            <th> Branch </th>
            <th> status </th>
            <th> Action </th>
          </tr>
          </thead>
          <tbody>
         { result.map((items, i) => {
              return(
                   
                <tr key={items.Id}> 
                  <td>{i + 1}</td>
                  <td>{items.FirstName}</td>
                  <td> {items.LastName} </td>
                  <td> {items.Department} </td>
                  <td> {items.Supervisor} </td>
                  <td> {items.JobTitle} </td>
                  <td> {items.Branch} </td>
                  <td> {items.Status} </td>
                  <td className='actiondiv'> 
                    <span onClick={() => handleDelete(items.Id)} className="fa fa-trash error cursor"></span>
                    <span onClick={() => handleEdit(items.Id)} className="fa fa-edit success cursor"></span>
                  </td>
                </tr>
              );
          })}
          </tbody>
        </table>

  </div>




 

      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Add new Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form>
          <div className="form-group fieldspace">
            <label htmlFor="">FirstName</label>
            <input name="FirstName" value={formValue.FirstName} onChange={handleChange} id="FirstName" type="text" className="form-control"  aria-describedby="" placeholder="" />
          </div>

          <div className="form-group fieldspace">
            <label htmlFor="">LastName</label>
            <input name="LastName" value={formValue.LastName} onChange={handleChange} id="LastName" type="text" className="form-control"  placeholder="" />
          </div>

          <div  className="form-group fieldspace">
            <label htmlFor="">Department</label>
            <select name="Department" value={formValue.Department} onChange={handleChange} id="Department" className="form-control">
              <option>Database Administration</option>
              <option>Digital and Payment</option>
              <option>Network Administration</option>
            </select>
          </div>

          <div className="form-group fieldspace">
            <label htmlFor="">Supervisor</label>
            <select name="Supervisor" value={formValue.Supervisor} onChange={handleChange} id="Supervisor" className="form-control">
              <option>Olu-Johnson Oluwatosin</option>
              <option>Richard Ford</option>
              <option>Eniola Catth</option>
            </select>
          </div>

          <div className="form-group fieldspace">
            <label htmlFor="">Job Title</label>
            <select name="JobTitle" value={formValue.JobTitle} onChange={handleChange} id="JobTitle" className="form-control">
              <option>Senior Developer</option>
              <option>Database Administrator</option>
              <option>Mobile Developer</option>
            </select>
          </div>


          <div className="form-group fieldspace">
            <label htmlFor="">Branch</label>
            <select name="Branch" value={formValue.Branch} onChange={handleChange} id="Branch" className="form-control">
              <option>Bolton</option>
              <option>Manchester City</option>
              <option>Southampton City</option>
            </select>
          </div>

         
        </form>
        
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={hideModal}>Cancel</button>
          {
          isUpdate == true ? <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
          :  <button type="button" onClick={handleClick} className="btn btn-success">Submit</button>}
        </Modal.Footer>
      </Modal>





    </div>
  );
}

export default App;
