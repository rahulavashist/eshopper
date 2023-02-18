import React,{useState,useEffect} from 'react'
import LeftNav from './LeftNav'

import {updateProduct,getProduct} from "../../Store/ActionCreators/ProductActionCreators"
import { useNavigate,useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
export default function AdminUpdateProduct() {
    var [name,setname] = useState("")
    var {id} = useParams()
    var product = useSelector((state)=>state.ProductStateData)
    var navigate = useNavigate()
    var dispatch = useDispatch()
    function getData(e){
        setname(e.target.value)
    } 
    function postData(e){
        e.preventDefault()
        var item = product.find((item)=>item.name===name)
        if(item)
        alert("Product Name is Already Exist")
        else{
            dispatch(updateProduct({id:id,name:name}))
            navigate("/admin-product")
        }
    }
    useEffect(()=>{
        dispatch(getProduct())
        var item = product.find((item)=>item.id===Number(id))
        setname(item.name)
    },[])
    return (
        <>
            <div className="contain-fluid my-5">
            <div className="row">
                <div className="col-lg-2 col-12">
                    <LeftNav/>
                </div>
                <div className="col-lg-10 col-12">
                    <h5 className='bg-secondary text-center text-light p-1'>Product</h5>
                    <form className='p-3' onSubmit={postData}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder='Enter Product Name : ' className='form-control' onChange={getData} value={name}/>
                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-secondary w-100'>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
