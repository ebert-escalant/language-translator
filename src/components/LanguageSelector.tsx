import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "@/constants/constants"
import { type FromLanguage, type Language, SectionType } from "@/types.d"

type Props =
	| { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
	| { type: SectionType.To, value: Language, onChange: (language: Language) => void }

const LanguageSelector = ({ type, value, onChange }: Props) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		onChange(event.target.value as Language)
	}

	return (
		<select
			className="border text-sm flex w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus-visible:outline-none"
			value={value}
			onChange={handleChange}
		>
			{type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar idioma</option>}
			{Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
				<option key={key} value={key}>{value}</option>
			))}
		</select>
	)
}

export default LanguageSelector