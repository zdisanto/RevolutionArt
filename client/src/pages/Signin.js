import React from 'react'

const Signin = () => {
  return (
    <div>
        {/* Sign In form */}
        <div className="space-y-4">
            {/* <!-- Card Number --> */}
            <div>
                <label className="block text-sm font-medium mb-1" for="card-nr">Sign In <span className="text-red-500">*</span></label>
                <input id="card-nr" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="1234 1234 1234 1234" />
            </div>
            {/* <!-- Expiry and CVC --> */}
            <div class="flex space-x-4">
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1" for="card-expiry">Expiry Date <span class="text-red-500">*</span></label>
                        <input id="card-expiry" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="MM/YY" />
                    </div>
                    <div class="flex-1">
                        <label class="block text-sm font-medium mb-1" for="card-cvc">CVC <span class="text-red-500">*</span></label>
                        <input id="card-cvc" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="CVC" />
                    </div>
            </div>
            {/* <!-- Name on Card --> */}
            <div>
                    <label class="block text-sm font-medium mb-1" for="card-name">Name on Card <span class="text-red-500">*</span></label>
                    <input id="card-name" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="John Doe" />
            </div>
            {/* <!-- Email --> */}
            <div>
                    <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                    <input id="card-email" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="john@company.com" />
            </div>
        </div>
        {/*Form footer*/}
        <div class="mt-6">
                <div class="mb-4">
                    <button class="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">Pay $253.00</button>
                </div>
                <div class="text-xs text-gray-500 italic text-center">You'll be charged $253, including $48 for VAT in Italy</div>
        </div>
    </div>
  )
}

export default Signin
