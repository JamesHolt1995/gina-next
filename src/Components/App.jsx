import { getSiteSettings } from "../Client";
import { useState, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";

import Home from "../Routes/Home";
import NoMatch from "../Routes/NoMatch"
import Layout from "../app/Layout";
import Post from "../Routes/Post";
import Posts from "../Routes/Posts";
import Page from "../Routes/Page";

import "../../node_modules/normalize.css/normalize.css";
import "../index.scss";

export default function App() {
  const [siteData, setSiteData] = useState(null);
  const [tl, setTl] = useState();

  useEffect(() => {
    getSiteSettings()
      .then((data) => {
        setSiteData(data)
        //console.log(data)
      }
      )
      .catch(console.error);
  }, []);//run once - no rerun dependencies


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      setTl(tl);
    });
    return () => ctx.revert();
  }, [siteData]);//run once - no rerun dependencies

  return (
    <>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout timeline={tl} siteData={siteData} />}>
          <Route index element={<Home siteData={siteData} timeline={tl} />} />
          <Route path=":slug" element={<Page />} />
          <Route path="/posts" element={<Posts />}>
            <Route path=":slug" element={<Post />} />
          </Route>
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

