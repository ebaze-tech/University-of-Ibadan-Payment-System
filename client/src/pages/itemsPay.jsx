import React, { useState } from "react";
import Nav from "../components/Nav";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
// import CardProcessing from "../cardProcessing";

const cardContent = [
  {
    title: "ID card processing",
    category: "M.I.S",
  },
  {
    title: "Portal access",
    category: "M.I.S",
  },
  { title: "Change of passport", category: "M.I.S" },
  { title: "Change of signature", category: "M.I.S" },
  { title: "Late complaint (student)", category: "M.I.S" },
  { title: "Pensioner service", category: "M.I.S" },
  { title: "Profile correction", category: "M.I.S" },
  { title: "Change of hall (student)", category: "M.I.S" },
  { title: "Change of hall (other)", category: "M.I.S" },
  { title: "Resumption of studies", category: "M.I.S" },
  { title: "ICT training", category: "M.I.S" },
];

const App = () => {
  const [courses, setCourses] = useState(cardContent);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services"); // Updated initial state

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All Services") {
      setCourses(cardContent); // Show all services when 'All Services' is clicked
    } else {
      const filtered = cardContent.filter(
        (course) => course.category === category
      );
      setCourses(filtered);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());

    const filtered = cardContent.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory === "All Services") {
      setCourses(filtered);
    } else {
      const filteredByCategory = filtered.filter(
        (course) => course.category === selectedCategory
      );
      setCourses(filteredByCategory);
    }
  };

  return (
    <div className="flex flex-col gap-5 py-5">
      <Nav onSearch={handleSearch} />
      <div className="md:px-10 px-5">
        <h1 className="font-semibold md:text-4xl">List of Services</h1>
        {/* category pills */}
        <div className="flex flex-wrap md:gap-4 gap-2 md:mt-5 mt-2">
          {["All Services", "M.I.S", "I.T.N.H", "S.D.U", "T.R.D", "U.M.C"].map(
            (category, index) => (
              <button
                key={index}
                className={`text-sm px-4 py-1.5 rounded-lg transition-all duration-200 ease-in-out ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
        {/* categories */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:mt-10 mt-5 gap-3 md:gap-7">
          {courses.length === 0 ? (
            <div className="col-span-4 text-center text-gray-500 py-40">
              Nothing found
            </div>
          ) : (
            courses.map((course, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-blue-400 px-6 py-5 gap-4"
              >
                <span className="font-semibold text-lg">{course.title}</span>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 font-medium text-sm text-white px-7 py-1.5 rounded-3xl">
                    {course.category}
                  </button>
                  <Link
                    to={`/service/${encodeURIComponent(course.title)}`} // Adjust the URL as needed
                    className="flex items-center gap-2 text-blue-500 font-semibold text-sm"
                  >
                    GO TO SERVICE
                    <BsArrowRight className="text-lg" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
