import { GetServerSideProps } from 'next';

import { logError, cookieManager, formatCurrency } from '@/_base/utils';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text } from '@chakra-ui/react';
import { IStore } from '@/_base/interfaces/store';
import { ProfilePic, StoreLogo } from '@/components/Logo';
import { StarRating } from '@/components/StarRating';
import { FaPlus } from 'react-icons/fa6';
import { getStore } from '@/_base/services/store';

interface IProps {
  store: IStore;
}

const Store: React.FC<IProps> = ({ store }) => {
  return (
    <Flex flex="1" padding="1rem" bgImage={store.profile_pic} w="100%" h="10rem" bgPosition="center" bgSize="cover">
      <Flex direction="column" flex="1" color="text" overflow="hidden auto" boxShadow="lg" bg="primaryBG" borderRadius="md">
        <Flex minH="14rem" maxH="14rem" direction="column" borderBottom="1px" borderColor="gray100" boxShadow="sm">
          <ProfilePic src={store.profile_pic} />
          <Flex flex="1" align="center" justify="space-between" p="0.5rem 0.75rem">
            <Flex direction="column" flex="1" align="center" gap="0.25rem">
              <Text noOfLines={2} flex="1" fontWeight="500" w="100%">
                {store.display_name}
              </Text>
              {!!store.address && (
                <Text fontSize="14px" opacity="0.85" noOfLines={2} w="100%">
                  {store.address}
                </Text>
              )}
            </Flex>
            <StoreLogo src={store.logo} />
          </Flex>
        </Flex>
        <Flex color="primary400" align="center" gap="0.5rem" justify="flex-end" p="0.5rem 1rem">
          <StarRating rating={Number(store.rating_average)} />
          <Text fontWeight="500">{Number(store.rating_average) > 5 ? `5.0` : store.rating_average}</Text>
        </Flex>
        <Flex direction="column" px="1rem">
          <Accordion>
            {store.menu.map((menuItem) => (
              <AccordionItem key={menuItem.id} mb="1rem" border="1px" borderColor="gray300" borderRadius="md" fontSize="15px">
                <AccordionButton>
                  <Flex direction="column" w="100%" fontSize="15px">
                    <Text noOfLines={1} textAlign="left" fontWeight="500">
                      {menuItem.name}
                    </Text>
                    <Text textAlign="left" fontSize="14px" opacity="0.85">
                      {formatCurrency(menuItem.price)}
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text>{menuItem.description}</Text>
                  <Flex color="primary300" mt="0.25rem" justify="flex-end">
                    <Box border="1px" borderRadius="md" p="0.25rem" fontSize="1.25rem" cursor="pointer">
                      <FaPlus />
                    </Box>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const selectedPage = 'store';

  try {
    cookieManager.updateToken(req);

    const store = await getStore(`${query.store_id}`);

    // const user = await validateSession();

    return { props: { selectedPage, pageTitle: store.display_name, store, showBackButton: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
