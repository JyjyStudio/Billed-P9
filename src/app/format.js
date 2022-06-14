export const formatDate = (dateStr) => {
	const date = new Date(dateStr)
	const year = new Intl.DateTimeFormat('fr', { year: '2-digit' }).format(date)
	const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date)
	const day = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date)
	const month = mo.charAt(0).toUpperCase() + mo.slice(1,3)
	return `${Number(day)} ${month}. ${Number(year)}`
}
 
export const formatStatus = (status) => {
	switch (status) {
	case 'pending':
		return 'En attente'
	case 'accepted':
		return 'Accepté'
	case 'refused':
		return 'Refused'
	}
}