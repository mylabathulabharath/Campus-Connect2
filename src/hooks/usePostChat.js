import { addDoc, arrayUnion, doc, updateDoc,collection } from 'firebase/firestore'
import { useState } from 'react'
import { firestore } from '../firebase/firebase'
import useAuthStore from '../store/authStore'
import useGetChats from './useGetChats'
// import usePostStore from '../store/postStore'
import useShowToast from './useShowToast'

const usePostChat = () => {
   const {isLoading,chats} =useGetChats()
  //  console.log("in usepostcht hook",chats)
  // console.log(chats)
  // console.log("From Use Chat and GETCHATS HOOK",chats)
  const [isChatting, setisChatting] = useState(false)
  const showToast = useShowToast()
  const authuser = useAuthStore((state) => state.user)
  // console.log(authuser.uid)
//   const addComment =usePostStore((state) => state.addComment)
  const university = authuser.university;

  const handlePostChat = async (chat) => {
    if(isChatting) return
    if(!authuser) return showToast("Error","You must Login to Comment",'error')
    setisChatting(true)
    const newChat = {
        chat,
        createdAt:Date.now(),
        createdBy:authuser.uid,
        uni:university
    }

    try {
        const postDocRef = await addDoc(collection(firestore, "chats"), newChat);
        // console.log(postDocRef.id)

    //    addComment(postId,new)



    } catch (error) {
       showToast("Error",error.message,"error") 
    }
    finally{
        setisChatting(false)
    }
  }
  return {isChatting,handlePostChat}
}

export default usePostChat