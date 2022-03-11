import React from "react";
import { ArrowDownIcon, AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const features = [
    {
      name: '#1',
      description:
        'feature #1',
      icon: GlobeAltIcon,
    },
    {
      name: '#2',
      description:
        'feature #2',
      icon: ScaleIcon,
    },
    {
      name: '#3',
      description:
        'feature #3',
      icon: LightningBoltIcon,
    },
    {
      name: '#4',
      description:
        'feature #4',
      icon: AnnotationIcon,
    },
  ]

const elements =[
    {
        name: 'Pool size',
        amount:'10',
    },
    {
        name: 'Liquidation reward',
        amount:'1000',
    },
    {
        name: 'lp tokens total',
        amount:'341',
    },


]



function LiquidityPool() {
  return (
    
        <div className="rounded-md h-fit w-fit p-4 shadow-lg py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Liquidity pool</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Ready to dive in?
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Liquidity pools are cool
                </p>
                    <div>
                    <button
                        type="button"
                        className="mt-5 p-2 bg-transparent rounded-full text-indigo-600 hover:text-white hover:bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                        onClick=""
                    >
                        <span className="sr-only">View features</span>
                        <ArrowDownIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
            
            </div>

            <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                <div key={feature.name} className="relative">
                    <dt>
                    <div className="shadow-lg absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
                ))}
            </dl>

            </div>
        {/* content-center text-indigo-600 font-semibold tracking-wide uppercase text-base relative  items-center justify-center */}
                <div className="place-content-strech gap-10 m-10 text-indigo-600 font-semibold tracking-wide uppercase text-base flex items-center justify-center">
                    <div className="ml-15">Pool size</div>
                    <div className="ml-15">Liquidation reward</div>
                    <div className="ml-15">lp tokens total</div>
                </div>
            </div>
            
        
            
        </div>

  )
}
    


export default LiquidityPool;