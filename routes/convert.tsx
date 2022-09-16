/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import CurrencyConverterForm from '../islands/ConverterForm.tsx';

import { Handlers, PageProps } from '$fresh/server.ts';

interface Data {
  amount: number;
  from: string;
  to: string;
  convertedAmount: number;
}

const DEFAULT_CURRENCY = 'USD';

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const amount = Number(url.searchParams.get('amount')) || 0;
    const from = url.searchParams.get('from') || DEFAULT_CURRENCY;
    const to = url.searchParams.get('to') || DEFAULT_CURRENCY;
    const csResponse = await fetch(`https://api.currencyscoop.com/v1/convert?api_key=${Deno.env.get('API_KEY')}&from=${from}&to=${to}&amount=${amount}`)
    const csResult = await csResponse.json();
    return ctx.render({ convertedAmount: csResult.response.value, amount, from, to });
  },
};

export default function Convert({ data }: PageProps<Data>) {
  console.log(data);
  return (
    <main className={tw`flex justify-center items-center h-screen`}>
      <div className={tw`p-4 max-w-screen-md`}>
        <CurrencyConverterForm currencies={['USD', 'EUR']}></CurrencyConverterForm>
        <div className={tw`font-medium`}>
          <span className={tw`text-slate-200`}>{data.amount} {data.from} = </span><br/>
          <span className={tw`text-2xl`}>{data.convertedAmount.toFixed(2)} {data.to}</span>
        </div>
      </div>
    </main>
  );
}