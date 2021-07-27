import { motion } from 'framer-motion';

import { uploadDate } from '../utils/date';
import Suggestions from './Suggestions';

const SearchResults = ({ results, searchVal, inputRef, change }) => {
  const limit_results = results.reverse().slice(0, 7);

  const handleLinkClick = (e) => {
    const hashId = e.currentTarget.href.split('#')[1];
    const element = document.getElementById(hashId);

    element.classList.add('animate-bounce');
    element.onclick = () => {
      element.classList.remove('animate-bounce');
    };
  };

  return (
    <motion.div
      className="mt-4"
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
    >
      {results.length || !searchVal ? (
        searchVal ? (
          <div>
            {limit_results.map((result) => (
              <a
                href={`#${result.id}`}
                key={result.id}
                onClick={handleLinkClick}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center mb-2 px-3 py-2 bg-dashbg border-l-4 border-indigo text-sm rounded-md cursor-pointer"
                >
                  <p className="text-indigo-light font-semibold w-3/4">
                    {result.filename}
                  </p>
                  <p className="text-indigo whitespace-nowrap">
                    {uploadDate(result.createdAt.seconds).fullDate}
                  </p>
                </motion.div>
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <motion.div
              className="flex justify-evenly mt-3 w-full shadow-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08 }}
            >
              {['image', 'pdf', 'doc', 'xls'].map((type) => (
                <Suggestions
                  key={type}
                  type={type}
                  inputRef={inputRef}
                  change={change}
                />
              ))}
            </motion.div>
          </div>
        )
      ) : (
        <p className="text-indigo-dark text-center">
          No items match your search
        </p>
      )}
    </motion.div>
  );
};

export default SearchResults;
