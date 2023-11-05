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
  const [pageParams, setPageParams] = useSearchParams({ page: '1' });
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
    const newPage = `${+(pageParams.get('page') || '1') + step}`;
    if (+newPage >= 1 && +newPage <= 130) {
      setPageParams({ page: newPage });
      changePage(newPage, limit);
    }
  };
  const submitLimit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPageParams({ page: '1' });
    changePage('1', limit);
  };

  return (
    <>
      <form className="pagination" onSubmit={submitLimit}>
        <span className="pagination__text">Number of pokemon per page:</span>
        <input
          className="pagination__input"
          type="text"
          value={limit || ''}
          onChange={(e) => setLimit(e?.target?.value)}
        />
        <input className="submit" type="submit" value="Apply" />
      </form>
      <div className="pagination">
        <button className="pagination__button" onClick={() => NextPrevChange(-1)}>
          prev
        </button>
        <input
          type="text"
          className="pagination__input"
          value={pageParams.get('page') || ''}
          onChange={(e) => {
            const page = e?.target?.value;
            setPageParams({ page });

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
