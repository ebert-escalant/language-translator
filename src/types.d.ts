import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "./constants/constants"

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE

export type FromLanguage = Language | AutoLanguage

export enum SectionType {
	From = 'from',
	To = 'to'
}