import { cubicOut } from "svelte/easing";
import { tweened } from "svelte/motion";
import { writable } from "svelte/store";
import { companySizeRegular, ringSizeRegular, rootSizeRegular } from "./constants";
import type { Auth0Client, User } from '@auth0/auth0-spa-js';

// Auth
export const auth0Client = writable<Auth0Client>();
export const isAuthenticated = writable<boolean>(false);
export const isLoading = writable<boolean>(true);
export const popupOpen = writable<boolean>(false);
export const error = writable();
export const user = writable<User | undefined>({});


export const companies = writable<Company[]>([]);
export const selectedCompany = writable<number>(0);
export const rotationEnabled = writable<boolean>(true);
export const rootX = tweened(0, {
  duration: 2500,
  easing: cubicOut
})
export const rootY = tweened(10000, {
  duration: 2500,
  easing: cubicOut
});

export const rootSize = tweened(rootSizeRegular, {
  duration: 2500,
  easing: cubicOut
});

export const showActivity = writable<boolean>(false);

export const ringSize = tweened(ringSizeRegular, {
  duration: 2500,
  easing: cubicOut
})

export const companySize = tweened(companySizeRegular, {
  duration: 2500,
  easing: cubicOut
})

export const selectedProject = writable<number>(0);
export const selectedTodo = writable<number>(0);

export const showSecondaryRing = writable<boolean>(false);
export const showTertiaryRing = writable<boolean>(false);
export const isTitleVisible = writable<boolean>(false);
export const isStartAnimationDone = writable<boolean>(false);