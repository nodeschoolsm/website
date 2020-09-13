import React from "react"

const HomePage = () => {
  return (
    <div className="flex h-screen overflow-hidden items-center flex-col justify-center">
      <p className="font-bold text-2xl">Estamos moviendo el website y Blog a NextJS.</p>
      <p className="text-xs mt-4">
        Ayudanos <a className="bg-yellow p-2 font-bold hover:underline" href="https://github.com/nodeschoolsm/website">a codearlo.</a>
      </p>
    </div>
  )
}

export default HomePage
