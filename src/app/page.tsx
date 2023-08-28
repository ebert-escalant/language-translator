"use client"
import { ChangeIcon, CopyIcon, VolumeHighIcon } from "@/assets/icons"
import LanguageSelector from "@/components/LanguageSelector"
import TextArea from "@/components/TextArea"
import { AUTO_LANGUAGE } from "@/constants/constants"
import { useDebounce } from "@/hooks/useDebounce"
import { useLanguageStore } from "@/store/language"
import { SectionType } from "@/types.d"
import { useEffect } from "react"

const HOST = process.env.NEXT_PUBLIC_HOST

const Home = () => {
	const fromLanguage = useLanguageStore(state => state.fromLanguage)
	const toLanguage = useLanguageStore(state => state.toLanguage)
	const interchangeLanguages = useLanguageStore(state => state.interchangeLanguages)
	const setFromLanguage = useLanguageStore(state => state.setFromLanguage)
	const setToLanguage = useLanguageStore(state => state.setToLanguage)
	const fromText = useLanguageStore(state => state.fromText)
	const result = useLanguageStore(state => state.result)
	const setFromText = useLanguageStore(state => state.setFromText)
	const setResult = useLanguageStore(state => state.setResult)
	const loading = useLanguageStore(state => state.loading)

	const debouncedFromText = useDebounce(fromText, 500)

	useEffect(() => {
		if (debouncedFromText.trim() === '' || !loading) return

		fetch(`${HOST ?? 'http://localhost:3000'}/api/translate`, {
			method: 'POST',
			body: JSON.stringify({
				fromLanguage,
				toLanguage,
				text: debouncedFromText
			})
		})
			.then(async (response) => {
				const res = await response.json()
				console.log("data", res)
				setResult(res.result)
			})
			.catch(error => {
				console.error(error)
			})
	}, [debouncedFromText, fromLanguage, toLanguage])

	const handleClipboard = () => {
		navigator.clipboard.writeText(result).catch(() => {})
	}

	const handleSpeech = () => {
		const utterance = new SpeechSynthesisUtterance(result)
		utterance.lang = toLanguage
		speechSynthesis.speak(utterance)
	}

	return (
		<main className="w-full min-h-screen h-full flex justify-center items-center">
			<section className="p-4 rounded max-w-3xl w-full mx-2 my-4">
				<h1 className="text-2xl font-bold text-center mb-2">Traductor</h1>
				<header className="grid grid-cols-11 w-full">
					<div className="col-span-5">
						<LanguageSelector
							type={SectionType.From}
							value={fromLanguage}
							onChange={setFromLanguage}
						/>
					</div>
					<div className="col-span-1 flex justify-center">
						<button
							type="button"
							className="text-gray-300 disabled:text-gray-400"
							onClick={interchangeLanguages}
							disabled={fromLanguage === AUTO_LANGUAGE}
						>
							<ChangeIcon />
						</button>
					</div>
					<div className="col-span-5">
						<LanguageSelector
							type={SectionType.To}
							value={toLanguage}
							onChange={setToLanguage}
						/>
					</div>
				</header>
				<main className="grid grid-cols-2 gap-2 mt-4">
					<div className="col-span-1 relative">
						<TextArea
							type={SectionType.From}
							text={fromText}
							onChange={setFromText}
						/>
					</div>
					<div className="col-span-1 relative">
						<TextArea
							type={SectionType.To}
							loading={loading}
							text={result}
							onChange={setResult}
						/>
						<div className="absolute left-2 bottom-2 flex items-center space-x-3">
							<button
								type="button"
								className="text-gray-300 disabled:text-gray-400"
								onClick={handleClipboard}
							>
								<CopyIcon />
							</button>
							<button
								type="button"
								className="text-gray-300 disabled:text-gray-400"
								onClick={handleSpeech}
							>
								<VolumeHighIcon />
							</button>
						</div>
					</div>
				</main>
			</section>
		</main>
	)
}

export default Home