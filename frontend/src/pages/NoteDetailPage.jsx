import { useEffect, useState } from "react"
import api from "../lib/axios"

import toast from 'react-hot-toast'
import {Link, useNavigate, useParams} from 'react-router'
import { LoaderIcon, Trash2Icon, ArrowLeftIcon} from "lucide-react"

const NoteDetailPage = () => {
  const [note,setNote] = useState(null)
  const [loading,setLoading] = useState(true)
  const [saving,setSaving] = useState(false)
  const navigate = useNavigate()

  const {id} =  useParams()

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {

        if(error.response.status === 429){
          toast.error("Too many requests")
        } else{
          console.log("Error in fetching note")
          toast.error("Failed to fetch the note")
        }
        
      } finally{
        setLoading(false)
      }
      
    }
    fetchNote()
  },[id]) 

  const  handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted")
      navigate("/")
    } catch (error) {
      if(error.response.status === 429){
        toast.error("Too many requests")

      }
      else{
        toast.error("Ther was an error updating the note")
        console.log("Error in handleDelete")
      }
    }
  }
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please add title and content")
      return
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      if(error.response.status === 429){
        toast.error("Too many requests")
        return
      }
      toast.error("Error while saving note")
      console.log("Error in handleSave" , error)
    }finally{
      setSaving(false)
    }
  }
  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"></LoaderIcon>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">


          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="h-5 w-5"></ArrowLeftIcon>
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline " >
            <Trash2Icon className="h-5 w-5"></Trash2Icon>
            Delete Note
          </button>

          </div>

          <div className="card bg-base-100 ">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input 
                type="text" 
                className="input input-bordered" 
                placeholder="Note title" 
                value={note.title} 
                onChange={(e)=>setNote({...note, title:e.target.value})}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your note here..." value={note.content} className="textarea textarea-bordered h-32" onChange={(e) => setNote({...note, content:e.target.value})}>

                </textarea>
              </div>

              <div className="card-actions justify-end ">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default NoteDetailPage