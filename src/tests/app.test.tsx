import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../app/page'

describe('Home', () => {
	test('My app works a expected', async () => {
		const user = userEvent.setup()
		const app = render(<Home />)

		const textAreaFrom = app.getByPlaceholderText('Introducir texto')

		await user.type(textAreaFrom, 'Hola mundo')

		const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 })

		expect(result).toBeTruthy()
	})
})