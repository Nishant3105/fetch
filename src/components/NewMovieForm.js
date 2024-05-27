import React,{useCallback, useState} from 'react'
import classes from './NewMovieForm.module.css'

const NewMovieForm = () => {
    const [formData,setFormData]=useState({
        title:'',
        openingText:'',
        releaseDate:''
    })

    const changeHandler=useCallback((e)=>{
        const {id,value} = e.target
        setFormData((prevState)=>({...prevState, 
            [id]:value
        }))
    },[])

    const submitHandler=useCallback((e)=>{
        e.preventDefault()
        // fetch.post('',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(formData)
        // })
        console.log(formData)
        setFormData({
            title:'',
            openingText:'',
            releaseDate:''
        })
    },[formData])

    return (
    <>
        <form className={classes['form-input']}>
            <label htmlFor='id'>Title</label>
            <input id="title" type="text" value={formData.title} onChange={changeHandler} />
            <label htmlFor='openingText'>Opening Text</label>
            <input id="openingText" type="text" value={formData.openingText}  onChange={changeHandler}/>
            <label htmlFor="releaseDate">Release Date</label>
            <input id="releaseDate" type="date" value={formData.releaseDate}  onChange={changeHandler}/>
            <button onClick={submitHandler}>Add Movie</button>
        </form>
    </>
  )
}

export default NewMovieForm