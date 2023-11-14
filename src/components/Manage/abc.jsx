// checkbox
function Checkbox({ name, value = false, updateValue = () => {}, children }) {
  // handle checkbox change
  const handleChange = () => {
    updateValue(!value, name);
  };

  return (
    <div className="py-2">
      <input
        type="checkbox"
        id={`${name}-checkbox`}
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label for={`${name}-checkbox`} className="ml-1 capitalize">
        {children}
      </label>
    </div>
  );
}

const listOptions = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "honeydew melon",
];

// checkboxes component
function Checkboxes() {
  const [selected, setSelected] = React.useState([]);

  function handleSelect(value, name) {
    if (value) {
      // if true
      setSelected([...selected, name]); // add to selected
    } else {
      // if false
      setSelected(selected.filter((item) => item !== name)); // remove from selected
    }
  }

  function selectAll(value) {
    if (value) {
      // if true
      setSelected(listOptions); // select all
    } else {
      // if false
      setSelected([]); // unselect all
    }
  }

  return (
    <div className="flex w-full min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        <h1 className="font-semibold text-lg mb-2">Checkbox List</h1>
        <div className="-mx-5 px-5 py-0 rounded bg-gray-100 font-medium">
          <Checkbox
            name="all"
            value={selected.length === listOptions.length}
            updateValue={selectAll}>
            Select All
          </Checkbox>
        </div>
        {listOptions.map((item) => {
          return (
            <Checkbox
              name={item}
              value={selected.includes(item)}
              updateValue={handleSelect}>
              {item}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Checkboxes />, document.getElementById("app"));
