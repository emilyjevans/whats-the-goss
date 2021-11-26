import React from "react";
import Select from "react-select";
const options = [
  { value: "created_at", label: "Created" },
  { value: "comment_count", label: "Number of comments" },
  { value: "votes", label: "Kudos" },
  { value: "author", label: "Author" },
  { value: "title", label: "Title" },
  { value: "topic", label: "Topic"}
];

const SortBySelector = ({ sortBy, setSortBy }) => {
  const handleChange = (e) => {
    setSortBy(e.value);
  };

  return (
    <>
      <Select onChange={handleChange} options={options} value={sortBy} />
    </>
  );
};

export default SortBySelector;
