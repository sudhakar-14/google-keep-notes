import React, { useEffect, useState } from 'react'
import './bin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashRestore, faTrash } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref, remove, update } from 'firebase/database'
import { db } from '../firebase'
import moment from 'moment'

function BinDiv() {

  const [notes,setNotes] = useState([])

  useEffect(()=>{
    const readData = async () =>{
      const getPost = []
      const query = ref(db,"notes")
      onValue(query,(snapShot)=>{
        const data = snapShot.val()
        if(snapShot.exists()){
          Object.values(data).map((project)=>{
            if(project.bin === true){
              getPost.push(project)
              setNotes(getPost)
            }
          })
        }
      })
    }
    readData()
  },[])

  const handleChangeDelete = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          remove(ref(db,`notes/${project}`))
        }
      })
    })
  }

  const handleChangeRestore = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          update(ref(db,`notes/${project}`),{bin : false})
        }
      })
    })
  }

  const handleAutoDelete = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          remove(ref(db,`notes/${project}`))
        }
      })
    })
  }

  return (
    <>
      <div className='notes'>
        <main>
          <div style={{marginBottom:"50px"}}>
            <span>Bin</span>
          </div>
          <div className='note-div'>
          {
            notes.length?
            notes.map((item)=>{
              if(moment(item.noteCreated,"YYYYMMDD").fromNow() === "30 days ago"){
                handleAutoDelete(item.id)
              }
            return(
              <div className='note-item' key={item.id} style={{backgroundColor : item.backgroundColor}}>
                <div className='bin-text'>
                  <span>{item?.title}</span>
                  <span>{item?.description}</span>
                </div>
                <div className='bin-option-icons'>
                  <FontAwesomeIcon icon={faTrash} onClick={()=>handleChangeDelete(item.id)}/>
                  <FontAwesomeIcon icon={faTrashRestore} onClick={()=>handleChangeRestore(item.id)}/>
                </div>
              </div>
              )}) : 
              <div>
                <span>
                  No Records Found
                </span>
              </div>
          }
        </div>
        </main>
      </div>
    </>
  )
}

export default BinDiv