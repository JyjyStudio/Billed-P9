import test from './usersTest'

const testUsers = [
	'cedric.hiely@billed.com',
	'christian.saluzzo@billed.com',
	'jean.limbert@billed.com',
	'joanna.binet@billed.com'
]

it('should return the test users', () => {
	expect(test).toEqual(testUsers)
})