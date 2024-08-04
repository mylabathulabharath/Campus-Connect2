import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const GoogleAuth = () => {
  return (
    <>
    <Flex cursor={'pointer'}>
						<Image src="/google.png" w={5} mx={4}
						alt='Google' />
						<Text fontSize={14} color={"blue.500"}>Continue with Google</Text>
					</Flex>
    </>
  )
}

export default GoogleAuth