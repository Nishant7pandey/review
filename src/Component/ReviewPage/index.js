import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReviewCard from "../ReviewCard";
import Pagination from '@mui/material/Pagination';

const ReviewPage = () => {
  

  const[open,setOpen]=useState(false);
  const[page,setPage]=useState(1);
  const [username, setUsername] = useState("");
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const[viewername,setViewername]= useState('')
  const handleUsername = async(e) => {
      setUsername(e.target.value);
      try {
        const response = await fetch(`http://www.i2ce.in/reviews/${e.target.value}${viewername && `/${viewername}`}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result =  await response.json();
  
          // console.log('result is: ', JSON.stringify(result, null, 4));
  
        setData(result);
        setOpen(true);
      } catch (err) {
          console.log(err);
      } finally {
          setIsLoading(false);
      }
  };
  const handleViewername = async(e) => {
      setViewername(e.target.value);
      try {
        const response = await fetch(`http://www.i2ce.in/reviews/${username}/${e.target.value}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result =  await response.json();
  
          // console.log('result is: ', JSON.stringify(result, null, 4));
  
        setData(result);
        setOpen(true);
      } catch (err) {
          console.log(err);
      } finally {
          setIsLoading(false);
      }
  };
  const handleChange = (event, value) => {
    setPage(value);
  };



useEffect(()=> {
      if(data) console.log(data);

  },[data])
  

  return (
    <div style={{backgroundColor:'#333',color:'#fff',display:'flex',alignItems:'center',flexDirection:'column',height:'100vh'}}>
      <header style={{display:'flex', position:'static',marginTop:"50px"}}>

      <FormControl sx={{ m: 1, minWidth: 120 ,backgroundColor:'#fff'}}  size="small">
      <InputLabel id="demo-select-small">ProductId</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={username}
        label="ProductId"
        onChange={handleUsername}
        important
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={11}>11</MenuItem>
        <MenuItem value={12}>12</MenuItem>
        <MenuItem value={13}>13</MenuItem>
        <MenuItem value={14}>14</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={16}>16</MenuItem>
        <MenuItem value={17}>17</MenuItem>
        <MenuItem value={18}>18</MenuItem>
        <MenuItem value={19}>19</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
    </FormControl>
    <FormControl sx={{ m: 1, minWidth: 120 ,backgroundColor:'#fff'}} size="small">
      <InputLabel id="demo-select-small">ViewerId</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={viewername}
        label="ViewerId"
        onChange={handleViewername}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
      </header>
      <div style={{display:'flex',gap:2}}>
      {isLoading && <h2>Loading...</h2>}
      {data && data?.reviews.filter((e,i)=> {
        return i>= 3*(page-1) && i<= 3*(page-1)+2
        
      }).map((p,index) => {
        return (
          <ReviewCard
          keys={index}
          comment={p.comment}
          title={p.title}
          friend={p.friend}
          name={p.reviewer.biography}
          usefulness={p.usefulness}
          rating={p.ratings}
          />
        );
      })}
      </div>
      <footer display={{diplay:'flex',alignItems:'center' }}>

      {open && (<Pagination count={data && Math.ceil(data?.reviews.length/3)}  size="large" onChange={handleChange} page={page} color='primary' variant="outlined" shape="rounded" />)}
      </footer >
    </div>
  );
};

export default ReviewPage;
