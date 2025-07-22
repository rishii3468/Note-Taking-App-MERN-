import toast from 'react-hot-toast'
import api from '../lib/axios.js'

import { useState , useEffect} from "react"
import NavBar from "../components/Navbar"
import RateLimitedUI from '../components/RateLimitedUI'
import NoteCard from '../components/NoteCard'
import NotesNotFound from './NotesNotFound.jsx'

const HomePage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false)
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes")
        
       
       
        setNotes(res.data)
        setIsRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes");
        if(error.response.status === 429){
          setIsRateLimited(true)
        } else{
          toast.error("Failed to import notes")
        }

      } finally{
        setLoading(false)
      }
    }
    fetchNotes();
  },[]);

 
  return (
    <div className="min-h-screen">
      <NavBar/>

      {isRateLimited && <RateLimitedUI />}
      
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>loading notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound/> }
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes = {setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage