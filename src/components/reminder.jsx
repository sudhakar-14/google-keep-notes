import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown, faLightbulb, faTrashCan, faPalette, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { onValue, ref, update } from 'firebase/database'
import { db } from '../firebase'


function ReminderDiv({searchText}) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [notes,setNotes] = useState([])
  const [colorShow, setColorShow] = useState(false)
  const [showPopover,setShowPopover] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  useEffect(()=>{
    const readData = async () =>{
      const getPost = []
      const query = ref(db,"notes")
      onValue(query,(snapShot)=>{
        const data = snapShot.val()
        if(snapShot.exists()){
          Object.values(data).map((project)=>{
            if(project.reminder === true && project.pin === false){
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

  const handleChangeNotes = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          update(ref(db,`notes/${project}`),{reminder : false})
        }
      })
    })
  }

  const handleChangeArchive = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          update(ref(db,`notes/${project}`),{reminder : false,archive : true})
        }
      })
    })
  }

  const handleChangeBin = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          update(ref(db,`notes/${project}`),{reminder : false,bin : true})
        }
      })
    })
  }

  const handleChangeColor = (id,color) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          return update(ref(db,`notes/${project}`),{backGroundColor : color})
        }
      })
    })
  }

  const handleShowPopover = (id) =>{
    setCurrentId(id)
    setShowPopover(!showPopover)
  }

  const handleChangeUpdate = (e) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === currentId){
          if(title !== "" && description !== ""){
            return update(ref(db,`notes/${project}`),{title : title, description : description})
          }
          else if(title === "" && description === ""){
            return
          }
          else if(title === ""){
            return update(ref(db,`notes/${project}`),{description : description})
          }
          else{
            return update(ref(db,`notes/${project}`),{title : title})
          }
        }
      })
    })
    setTitle("")
    setDescription("")
    setShowPopover(!showPopover)
  }

  const handleChangePinTrue = (id) =>{
    const query = ref(db,'notes') 
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          return update(ref(db,`notes/${project}`),{pin : true, reminder : false})
        }
      })
    })
  }

  return (
    <>
    <div className='notes' style={{filter: showPopover? "blur(2px)":"none"}}>
      <main>
        <div style={{marginBottom:"50px"}} className='title-div'>
          <span>Reminder</span>
        </div>
        
        <div className='note-div'>
          {
            notes.length?
            notes.map((item)=>(
              <div className='note-item' key={item.id} style={{backgroundColor: item.backGroundColor}}>
                <div className='bin-div'>
                  <div className='bin-text' onClick={()=>handleShowPopover(item.id)}>
                    <span>{item?.title}</span>
                    <span>{item?.description}</span>
                  </div>
                  <div className='bin-div-pin-icon' onClick={()=>handleChangePinTrue(item.id)}>
                    <span>
                      <FontAwesomeIcon style={{color:'rgb(73, 73, 73)'}} icon={faThumbtack}/>
                    </span>
                  </div>
                </div>
                <div className='bin-option-icons'>
                  <span>
                    <FontAwesomeIcon icon={faLightbulb} onClick={()=>handleChangeNotes(item.id)}/>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faFileArrowDown} onClick={()=>handleChangeArchive(item.id)}/>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faTrashCan} onClick={()=>handleChangeBin(item.id)}/>
                  </span>
                  <span className='color-icon' onClick={()=>setColorShow(!colorShow)}>
                    <FontAwesomeIcon icon={faPalette}/>
                    <div className='color-boxes' style={{display: colorShow? "flex":"none"}}>
                      <span onClick={()=>handleChangeColor(item.id,"lightblue")}></span>
                      <span onClick={()=>handleChangeColor(item.id,"lightcoral")}></span>
                      <span onClick={()=>handleChangeColor(item.id,"lightgreen")}></span>
                      <span onClick={()=>handleChangeColor(item.id,"lightpink")}></span>
                      <span onClick={()=>handleChangeColor(item.id,"transperant")}></span>
                    </div>
                  </span>
                </div>
              </div>
              )) : null
          }
        </div>
      </main>
    </div>
    <div className='popover-wrapper-div' style={{opacity: showPopover? "1":"0"}}>
        {
          notes.map((item)=>{
            if(item.id === currentId){
            return(
            <div className='popover-div' style={{backgroundColor:item.backGroundColor}}>
              <div className='popover-div1'>
                <input type="text" defaultValue={item.title} onChange={(e)=>setTitle(e.target.value)}/>
              </div>
              <div className='popover-div2'>
                <textarea name="description" type="text" cols="62" rows="10" defaultValue={item.description} onChange={(e)=>setDescription(e.target.value)}></textarea>
              </div>
              <div>
                <button className='title-note-input-button' onClick={handleChangeUpdate}>update</button>
              </div>
            </div>
            )}
          })
        }
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

export default ReminderDiv