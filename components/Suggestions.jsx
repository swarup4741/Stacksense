export const Suggestions = ({ type, inputRef, change }) => {
  const typeString = type === 'xls' ? 'Sheet' : type;

  return (
    <div
      className="ring-0 ring-offset-indigo ring-offset-1 bg-cardbg rounded-sm cursor-pointer"
      onClick={() => {
        inputRef.current.value = type;
        change();
      }}
    >
      <div className="flex flex-col items-center pb-2">
        <img
          className="sm:h-16 h-14 rounded-sm"
          src={`/assets/${type}.svg`}
          alt={`${type} search link`}
        />
        <p className="text-indigo-light text-xs -mt-3">
          {typeString.slice(0, 1).toUpperCase() +
            typeString.slice(1, typeString.length)}
        </p>
      </div>
    </div>
  );
};

export default Suggestions;
