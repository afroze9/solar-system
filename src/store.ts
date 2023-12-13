import { cubicOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import { writable } from "svelte/store";
import { companySizeRegular, ringSizeRegular, rootSizeRegular } from "./constants";

export const companies = writable<Company[]>([]);
export const rotationEnabled = writable<boolean>(true);
export const rootX = tweened(0, {
  duration: 2500,
  easing: cubicOut
})

export const rootSize = tweened(rootSizeRegular, {
  duration: 2500,
  easing: cubicOut
});

export const ringSize = tweened(ringSizeRegular, {
  duration: 2500,
  easing: cubicOut
})

export const companySize = tweened(companySizeRegular, {
  duration: 2500,
  easing: cubicOut
})