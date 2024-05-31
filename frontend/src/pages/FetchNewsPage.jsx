import React from 'react'
import AddNews from '../components/AddNews';
import LeftMenu from '../components/Layouts/LeftMenu';


const FetchNewsPage = () => {
  return (
    <>
    <section className="bg-stone-50 py-2 px-1 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-green-700 sm:text-2xl md:text-4xl">
                    Add News to the dashboard
                </h1>
            </div>
        </div>
    </section>
    <LeftMenu />
    <div className="flex justify-center items-center" style={{ padding: '0 20px' }}> <AddNews />
    </div>
  </>
  )
}

export default FetchNewsPage;