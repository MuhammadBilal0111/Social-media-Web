import React from "react";

function RightSidebar() {
  return (
    <section className="sticky top-0 right-0 h-screen z-20 w-fit flex flex-col justify-between gap-12 pt-28 pb-6 max-xl:hidden px-10 overflow-auto border-l bg-gray-950">
      <div className="flex flex-1 flex-col justify-start">
        <h2>Suggested Communities</h2>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h2>Suggested Users</h2>
      </div>
    </section>
  );
}
export default RightSidebar;
