import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import usePostChat from "../hooks/usePostChat";
import Chat from "./Chat";

const ChatModal = ({ isOpen, onClose,chat ,message}) => {
	const { handlePostChat, isCommenting } = usePostChat();
	// console.log("in chat modal",chat)
	// console.log("in chat model")
	const chatRef = useRef(null);
	const chatsContainerRef = useRef(null);
	const handleSubmitChat = async (e) => {
		// do not refresh the page, prevent it
		e.preventDefault();
		await handlePostChat(chatRef.current.value);
		chatRef.current.value = "";
	};

	useEffect(() => {
		const scrollToBottom = () => {
			chatsContainerRef.current.scrollTop = chatsContainerRef.current.scrollHeight;
		};
		if (isOpen) {
			setTimeout(() => {
				scrollToBottom();
			}, 100);
		}
	}, [isOpen,chat]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Chats</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"250px"}
						overflowY={"auto"}
						ref={chatsContainerRef}
					>
						{chat.map((chat,idx) => (
							<Chat key={idx} chat={chat} />
						))}
					</Flex>
					<form onSubmit={handleSubmitChat} style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={chatRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ChatModal;

// COPY AND PASTE AS THE STARTER CODE FOR THE COMMENTS MODAL COMPONENT
// import {
// 	Button,
// 	Flex,
// 	Input,
// 	Modal,
// 	ModalBody,
// 	ModalCloseButton,
// 	ModalContent,
// 	ModalHeader,
// 	ModalOverlay,
// } from "@chakra-ui/react";

// const CommentsModal = ({ isOpen, onClose }) => {
// 	return (
// 		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
// 			<ModalOverlay />
// 			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
// 				<ModalHeader>Comments</ModalHeader>
// 				<ModalCloseButton />
// 				<ModalBody pb={6}>
// 					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"}></Flex>
// 					<form style={{ marginTop: "2rem" }}>
// 						<Input placeholder='Comment' size={"sm"} />
// 						<Flex w={"full"} justifyContent={"flex-end"}>
// 							<Button type='submit' ml={"auto"} size={"sm"} my={4}>
// 								Post
// 							</Button>
// 						</Flex>
// 					</form>
// 				</ModalBody>
// 			</ModalContent>
// 		</Modal>
// 	);
// };

// export default CommentsModal;
