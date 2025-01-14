import React from "react";

function RightSidebar() {
  return (
    <section className="custom-scrollbar rightSidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h2 className="text-light-1 text-heading4-medium">
          Suggested Communities
        </h2>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h2 className="text-light-1 text-heading4-medium">Suggested Users</h2>
      </div>
    </section>
  );
}
export default RightSidebar;
