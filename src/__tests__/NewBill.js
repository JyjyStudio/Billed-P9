/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/dom'
import NewBillUI from '../views/NewBillUI.js'
import NewBill from '../containers/NewBill.js'
import { setLocalStorage } from '../../setup-jest'
import store from '../__mocks__/store.js'
// import userEvent from '@testing-library/user-event'

//setup
const onNavigate = () => {
	return
}
setLocalStorage('Employee')
Object.defineProperty(window, 'location', {
	value: { hash: '#employee/bill/new' },
})

describe('Given I am connected as an employee', () => {
	describe('When I access NewBill Page', () => {
		test('Then the newBill page should be rendered', () => {
			document.body.innerHTML = NewBillUI()
			expect(
				screen.getAllByText('Envoyer une note de frais')
			).toBeTruthy()
		})
		test('Then a form with nine fields should be rendered', () => {
			document.body.innerHTML = NewBillUI()
			const form = document.querySelector('form')
			expect(form.length).toEqual(9)
		})
	})
	describe('When I\'m on NewBill Page', () => {
		describe('And I upload a image file', () => {
			test('Then the file handler should show a file', () => {
				document.body.innerHTML = NewBillUI()
				const newBill = new NewBill({
					document,
					onNavigate,
					store,
					localStorage: window.localStorage,
				})
				const handleChangeFile = jest.fn(
					() => newBill.handleChangeFile
				)
				const inputFile = screen.getByTestId('file')
				inputFile.addEventListener('change', handleChangeFile)
	
				fireEvent.change(inputFile, {
					target: {
						files: [
							new File(['sample.jpg'], 'sample.jpg', {
								type: 'image/jpg',
							})
						],
					},
				})
				const numberOfFile = screen.getByTestId('file').files.length
				expect(numberOfFile).toEqual(1)
				expect(handleChangeFile).toBeCalled()
				expect(inputFile.files[0].type).toBe('image/jpg')
				expect(document.querySelector('.error--image-entension').style.display).toBe('none')
			})
		})
		describe('And I upload a non-image file', () => {
			test('Then the error message should be display', () => {
				document.body.innerHTML = NewBillUI()
				const newBill = new NewBill({
					document,
					onNavigate,
					store,
					localStorage: window.localStorage,
				})
				const handleChangeFile = jest.fn(
					() => newBill.handleChangeFile
				)
				const inputFile = screen.getByTestId('file')
				inputFile.addEventListener('change', handleChangeFile)
				fireEvent.change(inputFile, {
					target: {
						files: [
							new File(['sample.txt'], 'sample.txt', {
								type: 'text/txt',
							})
						],
					},
				})
				expect(handleChangeFile).toBeCalled()
				expect(inputFile.files[0].type).toBe('text/txt')
				expect(document.querySelector('.error--image-entension').style.display).toBe('block')
			})
		})
		describe('And I submit a valid bill form', () => {
			test('then a bill is created', () => {
				document.body.innerHTML = NewBillUI()
				const newBill = new NewBill({
					document,
					onNavigate,
					store,
					localStorage: window.localStorage,
				})
				const submit = screen.getByTestId('form-new-bill')
				const validBill = {
					name: 'validBill',
					date: '2022-06-06',
					type: 'Restaurants et bars',
					amount: 10,
					pct: 10,
					vat: '40',
					fileName: 'test.jpg',
					fileUrl: 'https://jyjystudio.github.io/test.jpg',
				}
				const handleSubmit = jest.fn((e) => newBill.handleSubmit(e))
				newBill.createBill = (newBill) => newBill
				document.querySelector(
					'input[data-testid="expense-name"]'
				).value = validBill.name
				document.querySelector(
					'input[data-testid="datepicker"]'
				).value = validBill.date
				document.querySelector(
					'select[data-testid="expense-type"]'
				).value = validBill.type
				document.querySelector('input[data-testid="amount"]').value =
					validBill.amount
				document.querySelector('input[data-testid="vat"]').value =
					validBill.vat
				document.querySelector('input[data-testid="pct"]').value =
					validBill.pct
				document.querySelector(
					'textarea[data-testid="commentary"]'
				).value = validBill.commentary
				newBill.fileUrl = validBill.fileUrl
				newBill.fileName = validBill.fileName
				submit.addEventListener('click', handleSubmit)
				fireEvent.click(submit)
				expect(handleSubmit).toHaveBeenCalled()
			})
		})
	})
})
