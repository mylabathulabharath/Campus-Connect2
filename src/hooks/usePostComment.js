import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'

const usePostComment = () => {
  const [isCommenting, setisCommenting] = useState(false)
  const showToast = useShowToast()
  const authuser = useAuthStore((state) => state.user)
  const addComment =usePostStore((state) => state.addComment)

  const handlePostComment = async (postId,comment) => {
    if(isCommenting) return
    if(!authuser) return showToast("Error","You must Login to Comment",'error')
    setisCommenting(true)
    const newComment = {
        comment,
        createdAt:Date.now(),
        createdBy:authuser.uid,
        postId
    }

    try {
       await updateDoc(doc(firestore,'posts',postId),{
        comments: arrayUnion(newComment)
       })

       addComment(postId,newComment)



    } catch (error) {
       showToast("Error",error.message,"error") 
    }
    finally{
        setisCommenting(false)
    }
  }
  return {isCommenting,handlePostComment}
}

export default usePostComment