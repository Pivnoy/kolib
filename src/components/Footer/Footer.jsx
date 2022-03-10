
import React from "react"

function Footer() {

    return (
        <footer className="absolute inset-x-0 bottom-0  p-4 bg-transparent rounded-lg shadow dark:bg-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" class="flex items-center mb-4 sm:mb-0">
                    <img src="https://kolibri.finance/img/kolibri-brand.b0cd3374.png" class="mr-3 h-8" alt="Kolibri Logo" />
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline">Kolibri™</a>. All Rights Reserved.
            </span>
        </footer> 
    )
}

export default Footer;