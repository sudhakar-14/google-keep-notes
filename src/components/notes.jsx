import React, { useEffect, useState } from 'react'
import './notes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faFileArrowDown, faPalette, faPen, faPenFancy, faThumbtack, faTrashCan, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck,faImage } from '@fortawesome/free-regular-svg-icons'
import { equalTo, getDatabase, onValue, orderByChild, orderByKey, orderByValue, query, ref, set, update } from 'firebase/database'
import { db } from '../firebase'
import { v4 as uuidv4} from 'uuid'
import moment from 'moment'





function NotesDiv({searchText,currentUserId}) {

  const [loading, setLoading] = useState(true)
  const [expand,setExpand] = useState(false)
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [notes, setNotes] = useState([])
  const [colorShow, setColorShow] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [showPopover, setShowPopover] = useState(false)

  useEffect(()=>{
    const readData = async () =>{
      var getPost = []
      const queries = await query(ref(db,"notes"),orderByChild("user"),equalTo(currentUserId))
      onValue(queries,(snapShot)=>{
        const data = snapShot.val()
        if(snapShot.exists()){
          Object.values(data).map((project)=>{
            // if(project.user === currentUserId){
              getPost.push(project)
              if(searchText === ""){
                setNotes(getPost)
                setLoading(false)
              } else {
                let filterSearch = getPost.filter(data=>(data.title).includes(searchText))
                setNotes(filterSearch)
                setLoading(false)
              }
          //   } else {
          //     setNotes(getPost)
          //     setLoading(false)
          //  }
          })
        } else {
          alert("something went wrong")
        }
      })
    }
    readData()
  },[searchText])

  const handleSubmit = () =>{
    try{
      function writeUserData(){
        const db = getDatabase()
        const id = uuidv4()
        set(ref(db,'notes/'+id),{
          title : title,
          description : description,
          id : id,
          pin : false,
          reminder : false,
          archive : false,
          bin : false,
          backGroundColor : "transperant",
          noteCreated : moment().format('YYYYMMDD'),
          user : currentUserId
        })
      }
      writeUserData()
    } catch(err) {
      alert(err.message)
    }
    setTitle("")
    setDescription("")
    setExpand(!expand)
  }

  const handleChangeReminder = (id) =>{
    const query = ref(db,'notes')
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          update(ref(db,`notes/${project}`),{reminder : true})
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
          update(ref(db,`notes/${project}`),{archive : true})
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
          return update(ref(db,`notes/${project}`),{bin : true})
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
          return update(ref(db,`notes/${project}`),{pin : true})
        }
      })
    })
  }

  const handleChangePinFalse = (id) =>{
    const query = ref(db,'notes') 
    onValue(query,(snapShot)=>{
      const data = snapShot.val()
      Object.keys(data).map((project)=>{
        if(project === id){
          return update(ref(db,`notes/${project}`),{pin : false})
        }
      })
    })
  }

  return (
    <>
      <div className='notes'>
        <main>
          <div style={{marginBottom:"50px"}}>
            {expand?
            <div className='title-note-input'>
              <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
              <input type="text" placeholder='Take a note...' onChange={(e)=>setDescription(e.target.value)}/>
              <div className='title-note-input-icons-button'>
                <div className='title-note-input-icons'>
                  <span>
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPen}/>
                  </span>
                </div>
                <button onClick={handleSubmit} className='title-note-input-button'>Save</button>
              </div>
            </div> :
            <div className='outside-box' onClick={()=>(setExpand(!expand))}>
              <span>Take a note...</span>
              <div className='notes-input-icon-div'>
                <span>
                  <FontAwesomeIcon icon={faSquareCheck}/>
                </span>
                <span>
                  <FontAwesomeIcon icon={faPenFancy}/>
                </span>
                <span>
                  <FontAwesomeIcon icon={faImage}/>
                </span>
              </div>
            </div>}
          </div>
          <div className='note-div' style={{filter: showPopover? "blur(2px)":"none"}}>
          {
            notes.map((item)=>{
              if(item.pin === true){
              return(
              <div className='note-item' key={item.id} style={{backgroundColor: item.backGroundColor}}>
                <div className='bin-div'>
                  <div className='bin-text' onClick={()=>handleShowPopover(item.id)}>
                    <span>{item?.title}</span>
                    <span>{item?.description}</span>
                  </div>
                  <div className='bin-div-pin-icon' onClick={()=>handleChangePinFalse(item.id)}>
                    <span>
                      <FontAwesomeIcon icon={faThumbtack} beat/>
                    </span>
                  </div>
                </div>
                <div className='bin-option-icons'>
                  <span>
                    <FontAwesomeIcon icon={faBell} onClick={()=>handleChangeReminder(item.id)}/>
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
              )}
              })
            }
            </div>
          <div className='note-div' style={{filter: showPopover? "blur(2px)":"none"}}>
          {
            notes.length?
            notes.map((item)=>{
              if(item.reminder === false && item.archive === false && item.bin === false && item.pin === false){
              return(
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
                    <FontAwesomeIcon icon={faBell} onClick={()=>handleChangeReminder(item.id)}/>
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
              )}
              }) : null
          }
        </div>
        </main>
      </div>
      <div style={{display: loading? "block":"none"}}>
          <FontAwesomeIcon style={{fontSize:"30px"}} icon={faSpinner} spin />
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
      <div className='no-records-div' style={{display: loading? "none":"block"}}>
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
export default NotesDiv

