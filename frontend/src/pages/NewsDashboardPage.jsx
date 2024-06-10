import React from "react";
import NewsTable from "../components/NewsDashboard/NewsTable";
import LeftMenu from "../components/Layouts/LeftMenu";
import Header from "../components/Header";
import useAuth from "../useAuth";
import ArchiveMenu from "../components/NewsDashboard/ArchiveMenu";

const NewsDashboardPage = ({ fetchData }) => {
  useAuth();

  const filterArchived = (article) => !article.archived && !article.deleted;

  return (
    <>
      <Header />
      <section className="py-2 px-1 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-roboto font-medium text-[#B96663] sm:text-2xl md:text-4xl">
              News dashboard
            </h1>
          </div>
        </div>
      </section>
      <LeftMenu />
      <div className="flex justify-center hover:scale-105 duration-150"
        style={{ padding: "0 20px" }}>
      <ArchiveMenu fetchData={fetchData} />
      </div>
      <div
        className="flex justify-center items-center"
        style={{ padding: "0 20px" }}
      >
        <NewsTable filterCondition={filterArchived} />
      </div>
    </>
  );
};

export default NewsDashboardPage;
