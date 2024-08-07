import React from "react";
import NewsTable from "../components/NewsDashboard/NewsTable";
import LeftMenu from "../components/Layouts/LeftMenu";
import Header from "../components/Header";
import useAuth from "../useAuth";

const ArchivedNewsPage = () => {
  useAuth();

  const filterArchived = (article) => article.archived && !article.deleted;

  return (
    <>
      <Header />
      <section className="py-2 px-1 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-roboto font-medium text-[#B96663] sm:text-2xl md:text-4xl">
              Archived News
            </h1>
          </div>
        </div>
      </section>
      <LeftMenu />
      <div className="flex justify-center items-center" style={{ padding: "0 20px" }}>
        <NewsTable filterCondition={filterArchived} showArchiveButton={false} />
      </div>
    </>
  );
};

export default ArchivedNewsPage;
