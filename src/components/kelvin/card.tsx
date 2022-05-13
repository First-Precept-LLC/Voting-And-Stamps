import { useRouter } from "next/router";


const Card = ({id, name, description}) => {
    const router = useRouter();
    return (<div className="flex flex-col border-b border-kelvinMedium py-4 px-10">
                    <div className="flex flex-col mb-2">
                        <h3 className="text-kelvinDark font-medium text-xl">{name}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="flex flex-wrap px-4 py-6 bg-kelvinLight rounded-md justify-start mb-4">
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-rocket"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-heart"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-leaf"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bolt-lightning"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-atom"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bomb"></i>
                            <p className="">32</p>
                        </div>
    
                    </div>
                    <div className="flex">
                        <button type="button"
                            className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={() => {
                                router.push() //TODO: redirect to this card's details.
                            }}
                            >Rate this content</button>
                    </div>
                </div>)

}

export default Card;