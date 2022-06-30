import { useState } from "react";
import React from "react";
import MainLayout from '../../components/layout/MainLayout';
import  CreateUserPopup from '../../components/users/create-users-popup'


function Users() {
    const [users,setUsers]=useState([{name:'',role:'',levelUp:'',department:''}]);
    const [addUserPopup,setAddUserPopup]=useState(false);
    const [addUser,setAddUser]=useState({name:'',role:'',levelUp:'',department:''});
    console.log(users);
    return (
        <>
          <head>
          <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Project Kelvin Widget</title>
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
                    integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
                    rel="stylesheet" />
                <link rel="stylesheet" href="./assets/css/style.css" />
                <script src="/tailwind.js"></script>
            </head>
            <MainLayout>
            <div class="flex w-full p-8 flex-col">
            <div class="flex justify-between">
                <h1 class="text-3xl mb-8">Users</h1>
                <button type="button"
                   className="bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                   id="dropdownDefault" data-dropdown-toggle="dropdown">
                    <i class="fa-solid fa-sort"></i>
                    Filters</button>
            </div>
            {/* <!-- Goals section --> */}
            <div class="flex flex-col mb-8" >
                <div class="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                    {users.map(item=>{
                        return(
                            <div
                            class="flex items-center w-full  justify-between p-4 bg-white shadow shadow-md rounded-md mb-2">
                            <div class="flex flex-col">
                                <h6 class="">{item.name}</h6>
                                <p class="text-xs text-kelvinBlack opacity-50">@saidutt</p>
                            </div>
                            <div class="flex">
                                <h6 class="">{item.role}</h6>
                            </div>
                            <a href="#" class="text-kelvinDark text-sm hover:underline">
                            {item.levelUp}
                            </a>
                            <a href="#" class="text-kelvinDark text-sm hover:underline">
                            {item.department} </a>
                            <button 
                            className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center hover:bg-kelvinBold"
                            data-modal-toggle="large-modal">
                                 <i class="fa-solid fa-pencil"></i>
                            Edit</button>
                               
                                
                        </div>
                        
                        )
                    })}
                 
                    <button type="button"
                        class="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-8 text-left w-full mb-2 hover:bg-kelvinBold"
                        data-modal-toggle="large-modal" onClick={()=>{setAddUserPopup(true)}}>
                        <i class="fa-solid fa-plus"></i>
                        Add User</button>
                       
                </div>
                {addUserPopup?<CreateUserPopup setAddUserPopup={setAddUserPopup} users={users}setUsers={setUsers} addUser={addUser} setAddUser={setAddUser} />:null}
                
                
                
            </div>
           
            <div class="flex">
            
            </div>
        </div>
        
        </MainLayout>
       
        </>
      
    )
}
export default Users;