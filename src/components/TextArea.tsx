import { SectionType } from "@/types.d"

interface Props {
	type: SectionType
	loading?: boolean
	text: string
	onChange: (text: string) => void
}

const getPlaceholder = (type: SectionType, loading: boolean): string => {
	if (type === SectionType.From) return "Introducir texto"
	else if (loading) return "Traduciendo..."
	return "Traducción"
}

const TextArea = ({ type, loading, text, onChange }: Props) => {
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
		onChange(event.target.value)
	}

	return (
		<textarea
			className="block h-80 w-full p-2 text-sm bg-gray-800 focus:ring-0 text-white placeholder-gray-400 rounded resize-none focus-visible:outline-none"
			placeholder={getPlaceholder(type, loading ?? false)}
			autoFocus={type === SectionType.From}
			value={text}
			onChange={handleChange}
			readOnly={type === SectionType.To}
		/>
	)
}

export default TextArea