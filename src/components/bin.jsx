import React, { useEffect, useState } from 'react'
import './bin.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashRestore, faTrash } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref, remove, update } from 'firebase/database'
import { db } from '../firebase'
import moment from 'moment'

function BinDiv({searchText}) {

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
              if(searchText === ""){
                setNotes(getPost)
              } else {
                console.log(Boolean("testing".includes(searchText)),getPost)
                let filterSearch = getPost.filter(data=>(data.title).includes(searchText))
                console.log(filterSearch,getPost)
                setNotes(filterSearch)
              }
            }
          })
        }
      })
    }
    readData()
  },[searchText])

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
          <div style={{marginBottom:"50px"}} className='title-div'>
            <span>Notes in the Recycle Bin are deleted after 30 days.</span>
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
              )}) : null
          }
        </div>
        </main>
      </div>
      <div className='no-records-div'>
        {
          !notes.length?
          <div>
            No Records Found
          </div> : null
        }
      </div>
    </>
  )
}

export default BinDiv