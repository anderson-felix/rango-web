import { useCustomRouter } from '@/_base/hooks/CustomRouter';
import { Button, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';

const NotFound: React.FC = () => {
  const router = useCustomRouter();

  return (
    <Container maxW="3xl" margin="auto">
      <Stack textAlign="center" spacing={{ base: 8, md: 10 }} align="center">
        <Image src="/not-found.jpg" alt="not found image" h="350px" w="350px" borderRadius="50%" />
        <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          Page not found <br />
        </Heading>
        <Text color="gray.500">The page you are looking for does not exist.</Text>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
          <Button
            colorScheme="green"
            bg="blue.400"
            rounded="full"
            px={6}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => router.push('/')}
          >
            Back to home
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;
