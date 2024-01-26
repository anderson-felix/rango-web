import { GetServerSideProps } from 'next';

import { logError, cookieManager } from '@/_base/utils';
import { Flex } from '@chakra-ui/react';
import { IUser } from '@/_base/interfaces/user';
import { IStore } from '@/_base/interfaces/store';
import { StoreListItem } from '@/components/StoreListItem';
import { TextInput } from '@/components/Inputs/Text';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useAsyncDebounce } from '@/_base/hooks';

interface IProps {
  user: IUser;
  stores: IStore[]
}

const Search: React.FC<IProps> = ({ stores }) => {
  const [targetText, setTargetText] = useState(``);
  const [targetStores, setTargetStores] = useState<IStore[]>([]);

  useAsyncDebounce(
    () => {
      const found = stores.filter((store) => {
        let isMatched = false;

        isMatched = !!store.display_name.match(targetText);
        isMatched = !!store.segments.find((segment) => segment.toLocaleLowerCase().match(targetText.toLocaleLowerCase()));

        return isMatched;
      });

      setTargetStores(found);
    },
    [targetText],
    500,
  );

  return (
    <Flex direction="column" flex="1" gap="24px" overflow="auto" color="text" p="1rem">
      <TextInput
        value={targetText}
        onInputChange={(e) => setTargetText(e)}
        leftElement={<FaSearch color="#21E080" />}
        placeholder="Pesquisar restaurantes e pratos"
        bg="white"
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

    // const user = await validateSession();

    return { props: { selectedPage, pageTitle: 'Rango - buscar', showBackButton: false, stores: [], showLastViewed: true } };
  } catch (err: any) {
    cookieManager.forceTokenExpires(res);
    logError(selectedPage, err);

    return { redirect: { destination: '/login', permanent: false } };
  }
};
