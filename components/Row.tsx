import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { useRef, useState } from "react"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props {
    // where use firebase
    // movie : Movie | DocumentData[]
    title: string
    movies: Movie[]
}


function Row({title, movies}: Props) {
   
    const rowRefs = useRef<HTMLDivElement>(null)

    const [isMove, setIsMove] = useState(false)

    const handClick = (direction: string) => {
         setIsMove(true)

         if(rowRefs.current) {
             const { scrollLeft, clientWidth } = rowRefs.current

             const scrollTo = direction === 'left' ? scrollLeft - clientWidth :
             scrollLeft + clientWidth

             rowRefs.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
         }
    }

    // console.log(rowRefs.current!.scrollLeft, rowRefs.current!.clientWidth);
    

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
        <h2
         className="w-55 cursor-pointer text-sm font-semibold text-[#e5e5e5]
         transition duration-200 hover:text-white md:text-2xl"
        >
            {title}
        </h2>

        <div className="group relative">
            <ChevronLeftIcon 
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9
            cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100
            ${!isMove && 'hidden'}`}
            onClick={() => handClick('left')}
            />

              <div ref={rowRefs} className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll
              md:space-x-2.5 md:p-2">
                  {/* thumbs */}
                  {movies.map((movie) => (
                    <Thumbnail 
                     key={movie.id}
                     movie={movie}
                    />
                  ))}
              </div>

            <ChevronRightIcon 
            className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9
            cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100
            `}
            onClick={() => handClick('right')}
            />
        </div>
    </div>
  )
}

export default Row