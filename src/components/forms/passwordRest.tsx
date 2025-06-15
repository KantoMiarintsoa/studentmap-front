import React from 'react'
import Button from '../ui/button'
import { FiSend, FiRefreshCw } from 'react-icons/fi'

function PasswordReset() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-[#f7f7f7] shadow-2xl rounded-2xl p-8 w-full max-w-md animate__animated animate__fadeIn">
        <h2 className="text-lg font-bold text-black mb-7 text-center flex items-center justify-center gap-2 animate__animated animate__fadeIn">
          <FiRefreshCw className="text-blue-600" /> Réinitialiser le mot de passe
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              className="mt-1 block w-full p-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
              required
            />
          </div>
          <Button className="mt-4 flex items-center justify-center gap-2 cursor-pointer">
            <FiSend className="text-white" /> Envoyer
          </Button>
        </form>
      </div>
    </div>
  )
}

export default PasswordReset
