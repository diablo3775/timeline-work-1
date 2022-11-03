import React, { useEffect, useState } from 'react'
import data from './a/name.json'
import './Baka.css'

const Baka = () => {
  const [data, setData] = useState([])
  const [date,setDate] = useState("")
  const [CallerName, setCallerName] = useState("");
  const [submit, setSubmit] = useState(false)

  const handleChangeCourse = (event) => {
    setDate(event.target.value);
  };

  const handleChangeName = (event) => {
    setCallerName(event.target.value);
  }

  const handleSubmit = () => {
    setSubmit(true)
  }


  const getUnique = (arr, comp) => {
    const unique = arr
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])
      
      .map((e) => arr[e]);

    return unique;
  };

  useEffect(() => {
    const data = require("./a/name.json");
    setData(data);
  }, []);

  const uniqueCouse = getUnique(data, "Date");
  const uniqueName = getUnique(data, "CallerName")

  const filterDropdown = data.filter(function (result) {
    return result.Date === date  && result.CallerName === CallerName;
  });

  return (
    <div>
      <label>
        Name:
          <select value={CallerName} onChange={handleChangeName}>
            {uniqueName.map((course) => (
              <option key={course.id} value={course.CallerName}>
                {course.CallerName}
              </option>
            ))}
          </select>
        </label><hr /><label>
          Date:
            <select value={date} onChange={handleChangeCourse}>
              {uniqueCouse.sort((a, b) => a.Date > b.Date ? 1 : -1).map((course) => (
                <option key={course.id} value={course.Date}>
                  {course.Date}
                </option>
              ))}
            </select>
          </label>
          <button onClick={handleSubmit}>Submit</button>

        {submit ? 
        <div className='flex'>
          {filterDropdown.sort((a,b) => Number(a.Time) > Number(b.Time) ? 1 : -1).map((course) => (
            <div key={course.id} style={{ margin: "10px" }}>
              <p>{course.Time}</p>
              <div className="tooltip-on-hover">⦿</div>
              <div className="tooltip">
              Phone Number: {course.PhoneNumber}
              <br /> 
               Message:{course.result 
                ? course.result.replace(/-->/g, 'to').replace(/[",']/g, '').slice(2,-2).split("\\n").map(place => <p> {place} </p>) 
                : "No Reply"}
              </div>
              <div>{course.PhoneNumber}</div>
            </div>
          ))}
        </div>
      : null}

    </div>
  )
}

export default Baka

