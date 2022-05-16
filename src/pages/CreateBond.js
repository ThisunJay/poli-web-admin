import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import * as FaIcons from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getAllClients, createBond, getOneBond, updateBond } from '../controllers/bond.api.controller'

export default function CreateBond() {

    const search = useLocation().search;
    const mode = new URLSearchParams(search).get('mode');
    const id = new URLSearchParams(search).get('id');
    const [editMode, setEditMode] = useState(false);

    //form values
  const [objId, setObjId] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("");
  const [released, setReleased] = useState(false);
  const [clientId, setClientId] = useState("");

  //dropdown values
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchDropdownData();
    if(mode == "Edit") {
        setEditMode(true);
        fetchBondData();
    }
  }, [])

  const fetchBondData = async () => {
      try {
          let bo = await getOneBond(id);

          setName(bo?.data?.data?.name);
          setObjId(bo?.data?.data?._id);
          setType(bo?.data?.data?.type);
          setDetails(bo?.data?.data?.details);
          setClientId(bo?.data?.data?.clientId);
          setReleased(bo?.data?.data?.released);
      } catch (error) {
          console.log(error);
      }
  }

  const fetchDropdownData = async () => {
      try {
          let cl = await getAllClients();
          setClients(cl?.data?.data);
      } catch (error) {
        toast.error("Dropdown fetch failed!")
        setClients([]);
      }
  }

  const validate = () => {
      if(name == "") {
          toast.error("Please Enter a Name!");
          return false;
      }
      else if(type == "") {
          toast.error("Please Enter a Type!");
          return false;
      }
      else if(clientId == "") {
          toast.error("Please Enter a Client!");
          return false;
      }
      else if(details == "") {
          toast.error("Please Enter Details!");
          return false;
      }

      return true;
  }

  const onCreateClicked = async () => {
      try {
          const data = {
            name,
            details,
            type,
            clientId,
            released
          }

          if(validate()) {
            let res = await createBond(data);
          }

          toast.success("Bond Created!");
          window.location.replace("/allBonds");
      } catch (error) {
          console.log(error);
          toast.error("Bond Create Failed!");
      }
  }

  const onUpdateClicked = async () => {
      try {
          if(validate()) {
            const data = {
                name,
                details,
                type,
                clientId,
                released
            }

            let up = await updateBond(objId, data);

            toast.success("Bond Updated!");
            window.location.replace("/allBonds");
          }
      } catch (error) {
        console.log(error);
        toast.error("Bond Update Failed!");
      }
  }

  return (
    <div>
        <Navbar />

        <div className='container'>
          <div className='row'>
            <div className='col-2'></div>
            <div className='col-8'>
              <div className='card my-4 shadow-sm rounded'>
                <div className='card-body'>
                  <h3 className='text-center'>{mode} Bond</h3> <hr/>

                  <form>
                    <div className='row mb-3'>
                      <div className='col-4'>
                        <label className='form-label' htmlFor='name'>Name</label>
                        <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-4'>
                        <label className='form-label' htmlFor='btype'>Type</label>
                        <input type="text" id='btype' value={type} onChange={(e) => setType(e.target.value)}
                          className="form-control"/>
                      </div>
                      <div className='col-4'>
                        <label className='form-label' htmlFor='client'>Client</label>
                        <select className='form-select' value={clientId} onChange={(e) => setClientId(e.target.value)}>
                            <option value="">Please Select a Client</option>
                            {
                                clients.map(i => {
                                    return <option value={i?._id}>{i?.fullName}</option>
                                })
                            }
                        </select>
                      </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-4'>
                            <label className='form-label' htmlFor='rele'>Released</label>
                            <select disabled={!editMode} className='form-select' id='rele' value={released} onChange={(e) => setReleased(e.target.value)}>
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                            </select>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-12'>
                            <label className='form-label' htmlFor='details'>Details</label>
                            <textarea id='details' className='form-control' value={details} onChange={(e) => setDetails(e.target.value)} />
                        </div>
                    </div>

                    {
                      editMode ? <button type="button" className="btn btn-success" onClick={(e) => onUpdateClicked()}>Update</button> : 
                      <button type="button" className="btn btn-primary" onClick={(e) => onCreateClicked()}>Create</button>
                    }
                    <button type="button" className="btn btn-danger mx-3" onClick={(e) => {
                      window.location.replace("/allBonds");
                    }}>Cancel</button>

                  </form>

                </div>
              </div>
            </div>
            <div className='col-2'></div>
          </div>
      </div>

    </div>
  )
}
