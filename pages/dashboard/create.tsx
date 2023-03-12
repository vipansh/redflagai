import React from "react";
import { MetaData, Navbar } from "../../components";
import { CreateForm } from "../../modules/dashboard";

type Props = {};

const Create = (props: Props) => {
  return (
    <div>
      <MetaData />
      <div className="bg-white relative">
        <header className="fixed right-0 top-0 left-0 bg-yellow-50 py-1 px-4 ">
          <Navbar />
        </header>
        <main className="pt-16 max-h-screen overflow-auto w-full">
          <div className="px-6 py-8">
            <CreateForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
