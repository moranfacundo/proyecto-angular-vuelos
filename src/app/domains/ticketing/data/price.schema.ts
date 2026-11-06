import { min, required, schema } from "@angular/forms/signals";
import { Price } from "./price";

export const initialPrice: Price = {
  fightClass: '',
  amount: 0,
}

export const priceSchema = schema<Price>( (path) => {
  required(path.fightClass);
  required(path.amount);
  min(path.amount, 0);
})
