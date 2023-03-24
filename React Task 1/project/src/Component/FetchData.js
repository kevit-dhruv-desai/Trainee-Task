import { useEffect, useMemo, useRef, useState } from "react";
import classes from "./FetchData.module.css";
import img from "../image/200w.gif";

const FetchData = () => {
  const [isData, setIsData] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dataHide, setDataHide] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((respose) => {
          return respose.json();
        })
        .then((data) => {
          setIsData(data);
          setIsLoading(false);
          console.log(data);
        });
    }, 2000);
  }, []);

  let timer = useRef();
  const changeHandler = (event) => {
    setDataHide(false);
    setIsLoading(true);
    

    if(timer.current)
    {clearTimeout(timer.current)}
    
    timer.current =setTimeout(() => {
      console.count()
      setSearch(event.target.value);
      setDataHide(true);
      setIsLoading(false);
    }, 2000);
  };
  
  const filterData = useMemo(()=>{
    return isData.filter((data) => {
      return search.toLowerCase() === ""
        ? data
        :   data.name.toLowerCase().includes(search) ||
            data.username.toLowerCase().includes(search) ||
            data.email.toLowerCase().includes(search) ||
            data.phone.toLowerCase().includes(search);
    })
  },[isData,search])
  return (
    <div>
      <section className={classes.section}>
        <input
          type="text"
          placeholder="Search"
          className={classes.input}
          onChange={changeHandler}
        />
      </section>
      {dataHide && (
        <section className={classes.section}>
          <table className={classes.table}>
            <thead>
              <tr className={classes.head}>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
              </tr>
            </thead>
            {filterData.length === 0 && <p className={classes.para}>Not Data Found.</p>}
            {filterData.map((data) => {
                return (
                  <tbody key={data.id}>
                    <tr className={classes.main}>
                      <td>{data.name}</td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </section>
      )}
      {isLoading && <img src={img} alt="" className={classes.img} />}

    </div>
  );
};
export default FetchData;
