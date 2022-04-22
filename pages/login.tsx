import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";


interface Inputs {
  email: string
  password: string
}

function Login() {
   

    const [login, setLogin] = useState(false)
    const {signIn, signUp} = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
         if(login) {
           await signIn(email, password)
         } else {
            await signUp(email, password)
         }
    }


  return (
    <div className="relative flex h-screen w-screen flex-col bg-black
    md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Movie - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src='https://www.phoneworld.com.pk/wp-content/uploads/2020/10/seo-watch-free-link-preview.jpg'
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      <img 
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Netflix_logo_%282%29.svg/1200px-Netflix_logo_%282%29.svg.png" 
      className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      width={150}
      height={150}
      />


      <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="relative mt-24 space-y-8 rounded
      bg-black/75 py-10 px-6
      md:mt-0 md:max-w-md md:px-14"
      >
         <h1 className="text-4xl font-semibold">Register in</h1>
         
         <div className="space-y-4">
           <label className="inline-block w-full">
             <input 
             type="email" 
             placeholder="get email" 
             className="input" 
            {...register("email", { required: true } )}
             />

            {errors.email && (
              <p className="p-1 text-[13px] font-light  text-yellow-500">
                Please enter a valid email required.
              </p>
            )}
           </label>
           <label className="inline-block w-full">
             <input 
             type="password" 
             placeholder="get pass" 
             className="input" 
             {...register("password", { required: true } )}
             />

             {errors.password && (
              <p className="p-1 text-[13px] font-light  text-yellow-500">
                Your password must contain between 4 and 67 characters.
              </p>
            )}
           </label>
         </div>

         <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
         >
           Register in
         </button>

         <div className="text-[grey]">
           new on netflix? {' '}
             <button
              type="submit"
              className="text-white hover:underline"
              onClick={() => setLogin(false)}
             >
               register on now
            </button>
         </div>
      </form>
    </div>
  )
}

export default Login