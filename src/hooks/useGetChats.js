// import { useEffect, useState } from "react";
// import useAuthStore from "../store/authStore";
// import useShowToast from "./useShowToast";
// import useUserProfileStore from "../store/userProfileStore";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// import { firestore } from "../firebase/firebase";
// import useChatStore from "../store/useChatStore";

// const useGetChats = () => {
// 	const authUser = useAuthStore((state) => state.user);
// 	console.log("in realtime",messages)
// 	const [isLoading, setIsLoading] = useState(true);
// 	const { chats, setChats } = useChatStore();
// 	const showToast = useShowToast();
// 	const { setUserProfile } = useUserProfileStore();

// 	useEffect(() => {
// 		const getChats = async () => {
// 			setIsLoading(true);
// 			if (authUser.university === "") {
// 				setIsLoading(false);
// 				setChats([]);
// 				return;
// 			}
// 			const q = query(collection(firestore, "chats"), where("uni", "==", authUser.university));

// 			// const q = query(collection(firestore, "chats"), where("uni", "==", authUser.university));
// 			// const [messages] = useCollectionData(q,{idField:'id'})
// 			// console.log(messages)
// 			try {
// 				const chat_history=[]
// 				const querySnapshot = await getDocs(q);
				
// 				querySnapshot.forEach((doc) => {
// 					chat_history.push({ id: doc.id, ...doc.data() });
					
// 				});
// 				chat_history.sort((a, b) => ( a.createdAt - b.createdAt ));
// 				setChats(chat_history)
// 			} catch (error) {
// 				showToast("Error", error.message, "error");
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		if (authUser) getChats();
// 	}, [authUser, showToast,setChats, setUserProfile]);
// 	return { isLoading,chats,messages };
// };

// export default useGetChats;

//NEW CHAYGPT

import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useChatStore from "../store/useChatStore";

const useGetChats = () => {
  const authUser = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const { chats, setChats } = useChatStore();
  const showToast = useShowToast();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    let unsubscribe;

    const getChats = () => {
      setIsLoading(true);
      if (authUser.university === "") {
        setIsLoading(false);
        setChats([]);
        return;
      }

      const q = query(collection(firestore, "chats"), where("uni", "==", authUser.university));

      try {
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const chat_history = [];
          querySnapshot.forEach((doc) => {
            chat_history.push({ id: doc.id, ...doc.data() });
          });
          chat_history.sort((a, b) => a.createdAt - b.createdAt);
          setChats(chat_history);
          setIsLoading(false);
        }, (error) => {
          showToast("Error", error.message, "error");
          setIsLoading(false);
        });
      } catch (error) {
        showToast("Error", error.message, "error");
        setIsLoading(false);
      }
    };

    if (authUser) getChats();

    // Cleanup the listener when the component unmounts or dependencies change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authUser, showToast, setChats, setUserProfile]);

  return { isLoading, chats };
};

export default useGetChats;
