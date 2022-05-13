import { PassThrough } from "stream";

import { routes } from "~/lib/routes";
import { useRouter } from "next/router";
import { apiRoutes } from "~/lib/api/apiRoutes";


const Index = (props) => {

    let cardsList = [];

    const router = useRouter();

    let body = props;


    try {
        const res = await fetch(apiRoutes.kelvin.card.href, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          //TODO: iterate over the content found, and push a Card component of each into the cards list
          //Potentially send one request per card instead?
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
      }
    }


    return (
    <>
    <head>
        <meta charSet="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
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