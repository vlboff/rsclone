import React, { useEffect, useState } from "react";
import MixesBlock from "../components/MixesBlock";
import { getCategories } from "../api/getCategories";
import { ICategory } from "../components/interfaces/apiInterfaces";

function HomePage() {
  const token = window.localStorage.getItem("token");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function foo() {
      setCategories(await getCategories(token));
    }
    foo();
  }, []);

  const getTenRandomCategories = () => {
    let arr = [...categories];
    let newArr: never[] = [];
    for (let i = 0; i < 10; i++) {
      let random = Math.floor(Math.random() * (10 - i)) + i;
      newArr.push(arr[random]);
      let category = arr[random];
      arr[random] = arr[i];
      arr[i] = category;
    }
    return newArr;
  };

  let homePageCategory: ICategory[] = [];

  if (categories.length > 0) {
    homePageCategory = getTenRandomCategories();
  }

  return (
    <div className="home-page">
      {homePageCategory.length > 0
        ? homePageCategory.map((category: ICategory) => {
            return (
              <MixesBlock
                key={category.name}
                name={category.name}
                categoryID={category.id}
              />
            );
          })
        : ""}
    </div>
  );
}

export default HomePage;
