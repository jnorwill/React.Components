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

  const changePage = (newPage: string) => {
    const offset = +newPage * 10 - 10;
    const changePage = {
      limit: '10',
      offset: `${offset}`,
    };
    change(changePage);
  };

  const NextPrevChange = (step: number) => {
    const newPage = `${+(searchParams.get('page') || '1') + step}`;
    if (+newPage >= 1 && +newPage <= 130) {
      setSearchParams({ page: newPage });
      changePage(newPage);
    }
  };

  return (
    <>
      <div className="pagination">
        <span className="pagination__text">Number of pokemon per page:</span>
        <input className="pagination__input" type="text" value={10} readOnly />
      </div>
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

            changePage(page);
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
