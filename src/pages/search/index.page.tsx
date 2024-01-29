import { GetServerSideProps } from 'next';

import { logError, cookieManager } from '@/_base/utils';
import { Flex } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { IStore } from '@/_base/interfaces/store';
import { StoreListItem } from '@/components/StoreListItem';
import { TextInput } from '@/components/Inputs/Text';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useAsyncDebounce } from '@/_base/hooks';
import { listStores } from '@/_base/services/store';
import { validateSession } from '@/_base/services/auth';

interface IProps {
  user: IUser;
}

const Search: React.FC<IProps> = () => {
  const [targetText, setTargetText] = useState(``);
  const [stores, setStores] = useState<IStore[]>([]);
  const [targetStores, setTargetStores] = useState<IStore[]>([]);

  useEffect(() => {
    (async () => {
      const _stores = await listStores();
      setStores(_stores);
    })();
  }, []);

  useAsyncDebounce(
    () => {
      const found = stores.filter((store) => {
        let isMatched = false;

        isMatched = !!store.display_name.match(targetText);
        isMatched = !!store.segments.find((segment) => segment.toLocaleLowerCase().match(targetText.toLocaleLowerCase()));
        isMatched = !!store.menu?.find((item) => item.name.toLocaleLowerCase().match(targetText.toLocaleLowerCase()));
        isMatched = !!store.menu?.find((item) => item.description.toLocaleLowerCase().match(targetText.toLocaleLowerCase()));

        return isMatched;
      });

      setTargetStores(found);
    },
    [targetText],
    500,
  );

  return (
    <Flex
      direction="column"
      flex="1"
      gap="24px"
      overflow="auto"
      color="text"
      p="1rem"
      w="100%"
      maxW={{ base: undefined, md: `70rem` }}
      margin={{ base: undefined, md: '0 auto' }}
    >
      <TextInput
        value={targetText}
        onInputChange={(e) => setTargetText(e)}
        leftElement={<FaSearch color="#21E080" />}
        placeholder="Pesquisar restaurantes e pratos"
        bg="surface"
      />
      <Flex direction="column" gap="1.25rem" pb="1remd">
        {targetStores.map((store) => (
          <StoreListItem key={store.id} store={store} segmentsQuantity={2} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const selectedPage = 'search';

  try {
    cookieManager.updateToken(req);

    const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango - buscar', showBackButton: false, user, showLastViewed: true } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
