import React from 'react'

export const Navbar = ({accounts, setAccounts})=> {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount(){
        if(window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts)
        }
    }
    
    return (
        <div className='w-full'>
            <div className='max-w-[1240px] mx-auto p-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-4xl text-white'>Logo</h1>
                    </div>
                    {isConnected ? (
                    <p className='text-white font-bold'>{accounts}</p>
                ): (
                    <button className='text-2xl text-white bg-black rounded-md border-2 border-orange-500 p-4' onClick={connectAccount}>Connect Wallet</button>
                )}
                </div>
                

            </div>
            
        </div>
    )


}