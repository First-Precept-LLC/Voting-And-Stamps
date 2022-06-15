import { PassThrough } from "stream";

import { routes } from "~/lib/routes";
import { useRouter } from "next/router";
import { apiRoutes } from "~/lib/api/apiRoutes";
import Card from "~/components/kelvin/card";
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'



const Index =  (props) => {

    let cardsList = [] as any;

    const router = useRouter();

    let body = props;

    const CARDS_QUERY = gql`
    query contents($nameFilter: String!) {
        contents(input: {filter: {name: {_in: [$nameFilter]}}}) {
          results {_id, name, description}
        }
    }`;

    const {loading, data, error} = useQuery(
        CARDS_QUERY,
        {
            variables: {nameFilter: props.nameFilter ? props.nameFilter : ""},
            notifyOnNetworkStatusChange: true,
        }

    );




    /*try {
        const res = await fetch("http://localhost:3000" + apiRoutes.kelvin.card.href, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          console.log("what is it?");
          console.log(await res.json());  
          let rawCards = (await res.json()).results.filter(card => card.name.includes(props.nameFilter));
          for(let i = 0; i < rawCards.length; i++) {
              let card = rawCards[i];
              cardsList.push(<Card name={card.name} description={card.description} id={card._id}/>);
          }
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
      }*/

    if (loading) {
        return <div>Loading...</div>
    }
    
    if (error) {
        return <div>{error.message}</div>
    }



    if (data) {
        let rawCards = data;
        for(let i = 0; i < rawCards.length; i++) {
            let card = rawCards[i];
            cardsList.push(<Card name={card.name} description={card.description} id={card._id}/>);
        }
    }
    
    return (
    <>
    <head>
        <meta charSet="UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Project Kelvin Widget</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
            integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
            rel="stylesheet" />
        <link rel="stylesheet" href="./assets/css/style.css"/>
    
    </head>
    
    <body>
    
        
        <div className="tabs ">
            <ul
                className=" text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full">
                    <a href="#"
                        className="inline-block p-4 w-full text-lg text-white bg-kelvinDark rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-kelvinDark dark:text-white"
                        aria-current="page">Voting</a>
                </li>
                <li className="w-full">
                    <a href="#"
                        className="inline-block p-4 w-full text-lg bg-kelvinMedium text-white rounded-r-lg hover:text-white hover:bg-kelvinDark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-kelvinMedium dark:hover:bg-kelvinDark">Impact</a>
                </li>
            </ul>
    
        </div>
        <div className="flex flex-col ">
            {cardsList}
        </div>
    </body>
    </>
    );

};

export default Index;