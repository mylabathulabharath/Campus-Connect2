import { Box, Button, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { NotificationsLogo } from "../../assets/constants";
import ChatModal from "../../Chatroom/ChatModal";
import useGetChats from "../../hooks/useGetChats";

const Notifications = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoading, chats , messages} = useGetChats();
	//console.log("from notifications page",chats)

	return (
		<>
		<Tooltip
			hasArrow
			label={"Notifications"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Flex
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
				onClick={onOpen}
			>
				<Image src="/campus/whisper.png" alt="Whisper Logo" width="28px" height="28px" />
				<Box display={{ base: "none", md: "block" }}>Whispering Room</Box>
			</Flex>
		</Tooltip>

		{isOpen ? <ChatModal isOpen={isOpen} onClose={onClose} chat={chats} messages={messages} /> : null}
	</>
	);
};

export default Notifications;
