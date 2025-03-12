export const getProductPluralize = (count: number) => {
	if (count === 1) {
		return 'товар'
	} else if (count >= 2 && count <= 4) {
		return 'товари'
	} else {
		return 'товарів'
	}
}
