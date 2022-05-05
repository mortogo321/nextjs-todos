import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="max-w-4xl mx-auto my-4">
    <Header />

    <div className="pt-4">{props.children}</div>
  </div>
);

export default Layout;
