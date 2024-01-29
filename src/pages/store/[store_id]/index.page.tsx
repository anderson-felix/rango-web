import { GetServerSideProps } from 'next';

import { logError, cookieManager, formatCurrency } from '@/_base/utils';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text } from '@chakra-ui/react';
import { IStore, IStoreMenuItem } from '@/_base/interfaces/store';
import { ProfilePic, StoreLogo } from '@/components/Logo';
import { StarRating } from '@/components/StarRating';
import { FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa6';
import { getStore, rateStore } from '@/_base/services/store';
import { useCallback, useEffect, useState } from 'react';
import { SmallModal } from '@/components/Modal/Small';
import { validateSession } from '@/_base/services/auth';
import { IUser } from '@/_base/interfaces/user';
import { IStorageOrderMetatada } from '@/_base/interfaces/order';
import { useCustomToast } from '@/_base/hooks';

interface IProps {
  user: IUser;
  store: IStore;
}

const Store: React.FC<IProps> = ({ store: _store, user }) => {
  const [store, setStore] = useState<IStore>(_store);
  const [modalData, setModalData] = useState<{ rating?: number } | null>(null);
  const [clearCartModalData, setClearCartModalData] = useState<{ item?: IStoreMenuItem } | null>(null);

  const toast = useCustomToast();

  useEffect(() => {
    const currentStorage = cookieManager.getCookie<string[]>(`last_viewed`, true) || [];

    const newStorage = [store.id, ...currentStorage.filter((id) => id !== store.id)];

    cookieManager.setCookie(`last_viewed`, JSON.stringify(newStorage));
  }, []);

  const handleLikeStore = useCallback(async (liked: boolean) => {
    const updatedStore = await rateStore({ store_id: store.id, liked });
    setStore(updatedStore);
  }, []);

  const handleRatingStore = useCallback(async () => {
    if (!modalData?.rating) {
      setModalData(null);
      return;
    }

    setModalData(null);
    const updatedStore = await rateStore({ store_id: store.id, rating: modalData.rating });
    setStore(updatedStore);
  }, [modalData]);

  const addItemInCart = (item: IStoreMenuItem) => {
    const storageData = cookieManager.getCookie<IStorageOrderMetatada>(`cart`, true);

    if (!storageData) {
      const newStorageData: IStorageOrderMetatada = {
        store_id: store.id,
        items: [{ id: item.id, name: item.name, quantity: 1, unit_price: item.price }],
      };

      cookieManager.setCookie(`cart`, JSON.stringify(newStorageData));
    } else if (storageData.store_id !== store.id) {
      setClearCartModalData({ item });
      return;
    } else {
      const targetItem = storageData.items.find((e) => e.id === item.id);

      if (targetItem) targetItem.quantity += 1;
      else storageData.items.push({ id: item.id, name: item.name, quantity: 1, unit_price: item.price });

      cookieManager.setCookie(`cart`, JSON.stringify(storageData));
    }

    toast({ status: `success`, description: `Item adicionado ao carrinho`, position: `top` });
  };

  const handleClearCart = () => {
    cookieManager.removeCookie(`cart`);
    setClearCartModalData((e) => {
      if (e?.item) addItemInCart(e.item);
      return null;
    });
  };

  return (
    <Flex flex="1" padding="1rem" bgImage={store.profile_pic} w="100%" h="10rem" bgPosition="center" bgSize="cover">
      <Flex
        direction="column"
        flex="1"
        color="text"
        overflow="hidden auto"
        boxShadow="lg"
        bg="primaryBG"
        borderRadius="md"
        w="100%"
        maxW={{ base: undefined, md: `70rem` }}
        margin={{ base: undefined, md: '0 auto' }}
      >
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
        <Flex align="center" justify="space-between" p="0.5rem 1rem">
          <Flex color="primary500" fontSize="1.25rem" cursor="pointer" onClick={() => handleLikeStore(!store.users_liked.includes(user.id))}>
            {store.users_liked.includes(user.id) ? <FaHeart /> : <FaRegHeart />}
          </Flex>
          <Flex color="primary400" align="center" gap="0.5rem" alignSelf="flex-end" w="fit-content" onClick={() => setModalData({})}>
            <StarRating rating={Number(store.rating_average)} />
            <Text fontWeight="500">{Number(store.rating_average) > 5 ? `5.0` : store.rating_average}</Text>
          </Flex>
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
                    <Box border="1px" borderRadius="md" p="0.25rem" fontSize="1.25rem" cursor="pointer" onClick={() => addItemInCart(menuItem)}>
                      <FaPlus />
                    </Box>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Flex>
      </Flex>

      <SmallModal
        title="Avaliar Loja"
        show={!!modalData}
        onClose={() => setModalData(null)}
        isCentered
        onConfirm={handleRatingStore}
        disableOkButton={!modalData?.rating}
      >
        <Flex mt="0.5rem" minW="15rem" direction="column" align="center" gap="1rem" my="1.5rem" color="text">
          <Text>Deixe sua avaliazação de 1 à 5</Text>
          <StarRating rating={modalData?.rating || 0} onChange={(rating) => setModalData({ rating })} fontSize="2rem" />
        </Flex>
      </SmallModal>

      <SmallModal
        title="Atenção"
        show={!!clearCartModalData}
        isCentered
        onConfirm={handleClearCart}
        onCancel={() => setClearCartModalData(null)}
        size="sm"
      >
        <Flex mt="0.5rem" minW="15rem" direction="column" align="center" gap="1rem" my="1.5rem">
          <Text textAlign="center" fontWeight="500" fontSize="18px" color="text">
            Seu carrinho contém itens de outra loja, deseja limpar o carrinho para adicionar este item?
          </Text>
        </Flex>
      </SmallModal>
    </Flex>
  );
};

export default Store;

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const selectedPage = 'store';

  try {
    cookieManager.updateToken(req);

    const store = await getStore(`${query.store_id}`);

    const user = await validateSession();

    return { props: { selectedPage, pageTitle: store.display_name, store, user, showBackButton: false } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
