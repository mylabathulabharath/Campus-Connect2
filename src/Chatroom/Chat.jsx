import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../utils/timeAgo";

const Chat = ({ chat }) => {
    // console.log("from chat file",chat)
	const { userProfile, isLoading } = useGetUserProfileById(chat.createdBy);

	if (isLoading) return <CommentSkeleton />;
	return (
		<Flex gap={4}>
			<Link to={`/${userProfile.username}`}>
				<Avatar src={userProfile.profilePicURL} size={"sm"} />
			</Link>
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					<Link to={`/${userProfile.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{userProfile.username}
						</Text>
					</Link>
					<Text fontSize={14}>{chat.chat}</Text>
				</Flex>
				<Text fontSize={12} color={"gray"}>
					{timeAgo(chat.createdAt)}
				</Text>
			</Flex>
		</Flex>
	);
};

export default Chat;

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};