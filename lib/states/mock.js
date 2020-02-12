import { writable } from 'svelte/store'

export const lastExecutedUrl = writable('')
export const url = writable('')
export const pattern = writable({})
export const mdAction = writable({})
