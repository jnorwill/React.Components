import { useState } from 'react';

import { useSearchParams } from 'react-router-dom';

type pageInfType = {
  limit: string;
  offset: string;
};
type PageProps = {
  change: (outputInf: pageInfType) => void;
};

const Pagination: React.FC<PageProps> = ({ change }) => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const [limit, setLimit] = useState('10');

  const changePage = (newPage: string, limit: string) => {
    const offset = +newPage * +limit - +limit;
    const changePage = {
      limit: `${limit}`,
      offset: `${offset}`,
    };
    change(changePage);
  };

  const NextPrevChange = (step: number) => {
    const newPage = `${+(searchParams.get('page') || '1') + step}`;
    if (+newPage >= 1) {
      setSearchParams({ page: newPage });
      changePage(newPage, limit);
    }
  };
  const submitLimit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ page: '1' });
    changePage('1', limit);
  };

  return (
    <>
      <form className="limit" onSubmit={submitLimit}>
        <span className="limit__text">Number of pokemon per page:</span>
        <input className="limit__input" type="text" value={limit || ''} onChange={(e) => setLimit(e?.target?.value)} />
        <input className="limit__submit" type="submit" value="Apply" />
      </form>
      <div className="pagination">
        <button className="pagination__button" onClick={() => NextPrevChange(-1)}>
          prev
        </button>
        <input
          type="text"
          className="pagination__input"
          value={searchParams.get('page') || ''}
          onChange={(e) => {
            const page = e?.target?.value;
            setSearchParams({ page });

            changePage(page, limit);
          }}
        />
        <button className="pagination__button" onClick={() => NextPrevChange(1)}>
          next
        </button>
      </div>
    </>
  );
};

export default Pagination;
