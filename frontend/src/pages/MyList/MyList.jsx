import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const MyList = () => {
  const location = useLocation();
  const { selectedTab } = location.state || {};
  const [activeTab, setActiveTab] = useState("Movies");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (selectedTab) {
      setActiveTab(selectedTab);
    }
  }, [selectedTab]);

  return (
    <div className="font-mori pt-16 text-secondaryColor">
      <div className="px-20">
        <div className="border-b border-secondaryColor py-8">
          <h1 className="text-4xl sm:text-6xl font-semibold">My List</h1>
        </div>

        <div className="md:flex py-10">
          <ul className="flex-column space-y space-y-4 text-sm font-medium md:me-4 mb-4 md:mb-0">
            <li>
              <a
                href="#"
                onClick={() => handleTabClick("Movies")}
                className={`inline-flex items-center text-2xl px-4 py-3 rounded-md w-full ${
                  activeTab === "Movies"
                    ? "text-primaryColor bg-secondaryColor"
                    : "text-secondaryColor bg-primaryColor"
                }`}
                aria-current="page"
              >
                Movies
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => handleTabClick("Recipes")}
                className={`inline-flex items-center text-2xl px-4 py-3 rounded-md w-full ${
                  activeTab === "Recipes"
                    ? "text-primaryColor bg-secondaryColor"
                    : "text-secondaryColor bg-primaryColor"
                }`}
              >
                Recipes
              </a>
            </li>
          </ul>
          <div className="p-6 rounded-md w-full bg-secondaryColor">
            {activeTab === "Movies" && (
              <div>
                {/* Moviesコンテンツ */}
                <h2>Movies List</h2>
                {/* 他のMoviesコンテンツ */}
              </div>
            )}
            {activeTab === "Recipes" && (
              <div>
                {/* Recipesコンテンツ */}
                <h2>Recipes List</h2>
                {/* 他のRecipesコンテンツ */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;
