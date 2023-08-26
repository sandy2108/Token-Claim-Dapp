import { useState } from "react"
import "./App.css"
import { Navbar } from "./Navbar";
import MainMint from "./MainMint";


export default function App(){
  const [accounts,setAccounts] = useState([]);

  return (
    <div className="App herobg">
      <Navbar accounts={accounts} setAccounts={setAccounts}/>
      <MainMint accounts={accounts} setAccounts={setAccounts}/>

    </div>
  )
}