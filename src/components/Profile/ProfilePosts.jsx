import { Box, Flex, Grid, Skeleton, Text, VStack } from '@chakra-ui/react'
import useGetUserPosts from '../../hooks/useGetUserPosts'
import ProfilePost from './ProfilePost'

const ProfilePosts = () => {

  const {isLoading,posts} = useGetUserPosts()
  // console.log(posts)
  const nullPostsFound = !isLoading && posts.length === 0;
  if(nullPostsFound) return <NoPostsFound />

  

  return (
    <Grid 
    templateColumns={{
      sm:'repeat(1, 1fr)',
      md:'repeat(3, 1fr)',
    }}
    gap={1}
    columnGap={1}
    >
      {isLoading && [0,1,2,3].map((_,idx)=>(
          <VStack key={idx} alignItems={'flex-start'}>
            <Skeleton w={'full'} >
              <Box h={'300px'}>Contents Wrapped</Box>
            </Skeleton>
          </VStack>
      ))}
      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost key={post.id} post={post} />
            ))}
        </>
      )}
    </Grid>
    
  )
}

export default ProfilePosts

const NoPostsFound = () =>{
  return (
    <Flex flexDir={'column'} textAlign={'center'} mx={'auto'} mt={10}>
      <Text fontSize={'2xl'}> No Posts Found 🤔</Text>
    </Flex>
  )
}