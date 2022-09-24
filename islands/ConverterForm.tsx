/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import supportedCurrencies from '../supported-currencies.json' assert { type: 'json' };
import { useState } from 'https://esm.sh/stable/preact@10.10.0/deno/hooks.js';

const currencyCodes = Object.entries(supportedCurrencies.fiats).map(([, currency]) => currency.currency_code);

interface ConverterFormProps {
  amount?: number,
  from?: string,
  to?: string
}

export default function ConverterForm({amount, from, to}: ConverterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form className={tw``} action="/convert" onSubmit={() => setSubmitted(true)}>
      <div className={tw`flex`}>
        <div className={tw`mb-4 px-1`}>
          <label className={tw`block text-gray-700 text-sm font-bold mb-2`} htmlFor="amount">
            Amount
          </label>
          <input
            className={tw`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="amount" name="amount" type="number" placeholder="0.0" value={amount || 0} required/>
        </div>
        <div className={tw`mb-6 px-1`}>
          <label className={tw`block text-gray-700 text-sm font-bold mb-2`} htmlFor="from">
            From
          </label>
          <select
            className={tw`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="from"
            name="from">
            {currencyCodes.map((currency) => <option key={currency} selected={from ? from === currency : currency === 'USD'} value={currency}>{currency}</option>)}
          </select>
        </div>
        <div className={tw`mb-6 px-1`}>
          <label className={tw`block text-gray-700 text-sm font-bold mb-2`} htmlFor="to">
            To
          </label>
          <select
            className={tw`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="to"
            name="to">
            {currencyCodes.map((currency) => <option key={currency} selected={to ? to === currency : currency === 'EUR'} value={currency}>{currency}</option>)}
          </select>
        </div>
      </div>
      <div className={tw`flex items-center justify-center px-2`}>
        <button
          className={tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit">
          {submitted ? 'Converting...' : 'Convert'}
        </button>
      </div>
    </form>
  )
}