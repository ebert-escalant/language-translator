import { AUTO_LANGUAGE } from "@/constants/constants"
import type { FromLanguage, Language } from "@/types"
import { create } from "zustand"

interface State {
	fromLanguage: FromLanguage
	toLanguage: Language
	fromText: string
	result: string
	loading: boolean
	interchangeLanguages: () => void
	setFromLanguage: (fromLanguage: FromLanguage) => void
	setToLanguage: (toLanguage: Language) => void
	setFromText: (fromText: string) => void
	setResult: (result: string) => void
}

export const useLanguageStore = create<State>((set, get) => {
	return {
		fromLanguage: 'auto',
		toLanguage: 'en',
		fromText: '',
		result: '',
		loading: false,
		interchangeLanguages: (): void => {
			const { fromLanguage, toLanguage } = get()

			if (fromLanguage === AUTO_LANGUAGE) return

			const { fromText, result } = get()
			const loading = fromText !== ''

			set({ fromLanguage: toLanguage, toLanguage: fromLanguage, loading, result: '', fromText: result })
		},
		setFromLanguage: (fromLanguage: FromLanguage): void => {
			const { fromText } = get()
			const loading = fromText !== ''

			set({ fromLanguage, loading, result: '' })
		},
		setToLanguage: (toLanguage: Language): void => {
			const { fromText } = get()
			const loading = fromText !== ''

			set({ toLanguage, loading, result: '' })
		},
		setFromText: (fromText: string): void => {
			const { fromText: oldFromText, result: oldResult } = get()

			const loading = oldFromText.trim() !== fromText.trim()
			const result = oldFromText.trim() !== fromText.trim() ? '' : oldResult

			set({ fromText, loading, result })
		},
		setResult: (result: string): void => {
			set({ result, loading: false })
		}
	}
})