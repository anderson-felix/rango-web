import { storesMock } from '@/_base/interfaces/store';
import { AppCarousel } from '@/components/Carousel';
import { Flex, Text } from '@chakra-ui/react';
import { StoreLogo } from '@/components/Logo';
import { useRouter } from 'next/router';

interface IProps {}

export const LastViewed: React.FC<IProps> = () => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      p="0.35rem 1rem"
      sx={{ '.carousel': { width: `100%`, zIndex: `2`, position: `relative` } }}
      boxShadow="md"
      borderRadius="0 0 8px 8px"
      bg="white"
      gap="0.35rem"
    >
      <Text fontSize="14px" opacity="0.8">
        Ver novamente
      </Text>
      <AppCarousel className="carousel" itemsByDevice={{ mobile: 3 }} infinite={false}>
        {storesMock.map((store) => (
          <Flex
            key={store.id}
            direction="column"
            w="8rem"
            align="center"
            justify="center"
            gap="0.35rem"
            onClick={() => router.push(`/store/${store.id}`)}
          >
            <StoreLogo src={store.logo} boxShadow="xs" />
            <Text noOfLines={2} textAlign="center" flex="1" color="text" fontSize="14px" opacity="0.8">
              {store.display_name}
            </Text>
          </Flex>
        ))}
      </AppCarousel>
    </Flex>
  );
};
