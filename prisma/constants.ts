export const categories = [
	{
		name: 'Піци',
	},
	{
		name: 'Сніданок',
	},
	{
		name: 'Закуски',
	},
	{
		name: 'Коктейлі',
	},
	{
		name: 'Напої',
	},
	{
		name: 'Кава',
	},
	{
		name: 'Комбо',
	},
	{
		name: 'Десерти',
	},
	{
		name: 'Люблять діти',
	},
	{
		name: 'Соуси',
	},
]

export const ingredients = [
	{
		name: 'Сирний бортик',
		price: 179,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
	},
	{
		name: 'Вершкова моцарела',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
	},
	{
		name: 'Сири чеддер і пармезан',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
	},
	{
		name: 'Гострий перець халапеньо',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png',
	},
	{
		name: 'Ніжний курча',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
	},
	{
		name: 'Шампіньйони',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
	},
	{
		name: 'Шинка',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
	},
	{
		name: 'Пікантна пепероні',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
	},
	{
		name: 'Гостра чорізо',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
	},
	{
		name: 'Мариновані огірочки',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
	},
	{
		name: 'Свіжі томати',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
	},
	{
		name: 'Червона цибуля',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
	},
	{
		name: 'Соковиті ананаси',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
	},
	{
		name: 'Італійські трави',
		price: 39,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png',
	},
	{
		name: 'Солодкий перець',
		price: 59,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B',
	},
	{
		name: 'Кубики бринзи',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
	},
	{
		name: 'Мітболи',
		price: 79,
		imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png',
	},
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
	{
		name: 'Омлет з шинкою і грибами',
		imageUrl: '/assets/img/products/omelet-with-shank-and-mushrooms.avif',
		categoryId: 2,
	},
	{
		name: 'Омлет з пепероні',
		imageUrl: '/assets/img/products/omelet-with-pepperoni.avif',
		categoryId: 2,
	},
	{
		name: 'Омлет із беконом',
		imageUrl: '/assets/img/products/omelet-with-bacon.avif',
		categoryId: 2,
	},
	{
		name: 'Омлет сирний',
		imageUrl: '/assets/img/products/omelet-cheese.avif',
		categoryId: 2,
	},
	{
		name: 'Додстер із шинкою',
		imageUrl: '/assets/img/products/dodster-with-ham.avif',
		categoryId: 2,
	},
	{
		name: 'Сирники зі згущеним молоком',
		imageUrl: '/assets/img/products/cheesecakes-with-condensed-milk.avif',
		categoryId: 2,
	},
	{
		name: 'Сирники з малиновим варенням 👶',
		imageUrl: '/assets/img/products/cheesecakes-with-raspberry-jam.avif',
		categoryId: 2,
	},
	{
		name: 'Сирники',
		imageUrl: '/assets/img/products/cheesecakes.avif',
		categoryId: 2,
	},
	{
		name: 'Кава Американо',
		imageUrl: '/assets/img/products/coffee-americano.avif',
		categoryId: 2,
	},
	{
		name: 'Кава Капучіно',
		imageUrl: '/assets/img/products/coffee-cappuccino.avif',
		categoryId: 2,
	},
	{
		name: 'Кава Латте',
		imageUrl: '/assets/img/products/coffee-latte.avif',
		categoryId: 2,
	},
	{
		name: 'Комбо Сніданок на двох',
		imageUrl: '/assets/img/products/combo-breakfast-for-two.avif',
		categoryId: 2,
	},
	{
		name: 'Паста з креветками',
		imageUrl: '/assets/img/products/pasta-with-shrimps.avif',
		categoryId: 3,
	},
	{
		name: 'Денвіч шинка та сир',
		imageUrl: '/assets/img/products/danwich-ham-and-cheese.avif',
		categoryId: 3,
	},
	{
		name: 'Денвіч чоризо барбекю',
		imageUrl: '/assets/img/products/danwich-chorizo-bbq.avif',
		categoryId: 3,
	},
	{
		name: 'Паста Карбонара',
		imageUrl: '/assets/img/products/pasta-carbonara.avif',
		categoryId: 3,
	},
	{
		name: `Паста М'ясна`,
		imageUrl: '/assets/img/products/pasta-meat.avif',
		categoryId: 3,
	},
	{
		name: 'Паста Песто',
		imageUrl: '/assets/img/products/pasta-pesto.avif',
		categoryId: 3,
	},
	{
		name: 'Супермясной Додстер',
		imageUrl: '/assets/img/products/dodster-super-meat.avif',
		categoryId: 3,
	},
	{
		name: 'Додстер із шинкою',
		imageUrl: '/assets/img/products/dodster-with-ham.avif',
		categoryId: 3,
	},
	{
		name: 'Додстер',
		imageUrl: '/assets/img/products/dodster.avif',
		categoryId: 3,
	},
	{
		name: 'Острый Додстер 🌶🌶',
		imageUrl: '/assets/img/products/dodster-spicy.avif',
		categoryId: 3,
	},
	{
		name: 'Грибний Стартер 🌱',
		imageUrl: '/assets/img/products/starter-mushroom.avif',
		categoryId: 3,
	},
	{
		name: 'Сирний Стартер 🌱',
		imageUrl: '/assets/img/products/starter-cheese.avif',
		categoryId: 3,
	},
	{
		name: 'Курячі нагетси',
		imageUrl: '/assets/img/products/chicken-nuggets.avif',
		categoryId: 3,
	},
	{
		name: 'Картопля з печі з соусом 🌱👶',
		imageUrl: '/assets/img/products/potatoes-oven-baked-with-sauce.avif',
		categoryId: 3,
	},
	{
		name: 'Картопля з печі 🌱👶',
		imageUrl: '/assets/img/products/potatoes-oven-baked.avif',
		categoryId: 3,
	},
	{
		name: 'Курячі шматочки 👶',
		imageUrl: '/assets/img/products/chicken-pieces.avif',
		categoryId: 3,
	},
	{
		name: 'Курячі крила барбекю',
		imageUrl: '/assets/img/products/chicken-wings-bbq.avif',
		categoryId: 3,
	},
	{
		name: 'Ланчбокс з курячими крилами',
		imageUrl: '/assets/img/products/lunchbox-with-chicken-wings.avif',
		categoryId: 3,
	},
	{
		name: 'Ланчбокс із курячими шматочками',
		imageUrl: '/assets/img/products/lunchbox-with-chicken-pieces.avif',
		categoryId: 3,
	},
	{
		name: 'Салат Цезар',
		imageUrl: '/assets/img/products/caesar-salad.avif',
		categoryId: 3,
	},
	{
		name: 'Молочний коктейль Ожина-малина',
		imageUrl: '/assets/img/products/milkshake-blackberry-raspberry.avif',
		categoryId: 4,
	},
	{
		name: 'Молочний коктейль Піна Колада',
		imageUrl: '/assets/img/products/milkshake-pina-colada.avif',
		categoryId: 4,
	},
	{
		name: 'Молочний коктейль із печивом Oreo',
		imageUrl: '/assets/img/products/milkshake-oreo-cookie.avif',
		categoryId: 4,
	},
	{
		name: 'Класичний молочний коктейль',
		imageUrl: '/assets/img/products/milkshake-classic.avif',
		categoryId: 4,
	},
	{
		name: 'Полуничний молочний коктейль',
		imageUrl: '/assets/img/products/milkshake-strawberry.avif',
		categoryId: 4,
	},
	{
		name: 'Шоколадний молочний коктейль',
		imageUrl: '/assets/img/products/milkshake-chocolate.avif',
		categoryId: 4,
	},
	{
		name: 'Какао',
		imageUrl: '/assets/img/products/cocoa.avif',
		categoryId: 5,
	},
	{
		name: 'Rich Tea Чорний з лимоном',
		imageUrl: '/assets/img/products/rich-tea-black-with-lemon.avif',
		categoryId: 5,
	},
	{
		name: 'Rich Tea Зелений',
		imageUrl: '/assets/img/products/rich-tea-green.avif',
		categoryId: 5,
	},
	{
		name: 'Rich Tea Зелений з манго',
		imageUrl: '/assets/img/products/rich-tea-green-with-mango.avif',
		categoryId: 5,
	},
	{
		name: 'Rich сік Апельсиновий',
		imageUrl: '/assets/img/products/rich-juice-orange.avif',
		categoryId: 5,
	},
	{
		name: 'Rich сік Яблучний',
		imageUrl: '/assets/img/products/rich-juice-apple.avif',
		categoryId: 5,
	},
	{
		name: 'Rich нектар Вишневий',
		imageUrl: '/assets/img/products/rich-nectar-cherry.avif',
		categoryId: 5,
	},
	{
		name: 'Кава Карамельна капучино',
		imageUrl: '/assets/img/products/coffee-caramel-cappuccino.avif',
		categoryId: 6,
	},
	{
		name: 'Кава Кокосовий латте',
		imageUrl: '/assets/img/products/coffee-coconut-latte.avif',
		categoryId: 6,
	},
	{
		name: 'Кава Горіховий латте',
		imageUrl: '/assets/img/products/coffee-nut-latte.avif',
		categoryId: 6,
	},
	{
		name: 'Айс капучіно',
		imageUrl: '/assets/img/products/ice-cappuccino.avif',
		categoryId: 6,
	},
	{
		name: 'Кава Американо',
		imageUrl: '/assets/img/products/coffee-americano.avif',
		categoryId: 6,
	},
	{
		name: 'Кава Капучіно',
		imageUrl: '/assets/img/products/coffee-cappuccino.avif',
		categoryId: 6,
	},
	{
		name: 'Кава Латте',
		imageUrl: '/assets/img/products/coffee-latte.avif',
		categoryId: 6,
	},

	{
		name: 'Чікен бокс',
		imageUrl: '/assets/img/products/chicken-box.avif',
		categoryId: 7,
	},
	{
		name: 'Комбо Сніданок на двох',
		imageUrl: '/assets/img/products/combo-breakfast-for-two.avif',
		categoryId: 7,
	},
	{
		name: '3 піци 25 см',
		imageUrl: '/assets/img/products/three-pizzas-twenty-five-cm.avif',
		categoryId: 7,
	},
	{
		name: '2 піци',
		imageUrl: '/assets/img/products/two-pizzas.avif',
		categoryId: 7,
	},
	{
		name: '3 піци',
		imageUrl: '/assets/img/products/three-pizzas.avif',
		categoryId: 7,
	},
	{
		name: '4 Закуски',
		imageUrl: '/assets/img/products/four-snacks.avif',
		categoryId: 7,
	},
	{
		name: '2 фірмові закуски',
		imageUrl: '/assets/img/products/two-specialty-snacks.avif',
		categoryId: 7,
	},
	{
		name: '2 десерти',
		imageUrl: '/assets/img/products/two-desserts.avif',
		categoryId: 7,
	},
	{
		name: '2 кави: Латте або Капучіно',
		imageUrl: '/assets/img/products/two-coffees-latte-or-cappuccino.avif',
		categoryId: 7,
	},
	{
		name: '2 соуси',
		imageUrl: '/assets/img/products/two-sauces.avif',
		categoryId: 7,
	},
	{
		name: 'Чізкейк Нью-Йорк з кокосом',
		imageUrl: '/assets/img/products/cheesecake-new-york-with-coconut.avif',
		categoryId: 8,
	},
	{
		name: 'Бони',
		imageUrl: '/assets/img/products/bonds.avif',
		categoryId: 8,
	},
	{
		name: 'Листкові палички з ананасами та брусницею',
		imageUrl: '/assets/img/products/puff-pastry-sticks-with-pineapple-and-lingonberry.avif',
		categoryId: 8,
	},
	{
		name: 'Макарон манго-маракуйя',
		imageUrl: '/assets/img/products/macaroni-mango-passion-fruit.avif',
		categoryId: 8,
	},
	{
		name: 'Чізкейк Нью-Йорк',
		imageUrl: '/assets/img/products/cheesecake-new-york.avif',
		categoryId: 8,
	},
	{
		name: 'Чізкейк Банановий із шоколадним печивом',
		imageUrl: '/assets/img/products/cheesecake-banana-with-chocolate-chip-cookies.avif',
		categoryId: 8,
	},
	{
		name: 'Еклери-міні із заварним кремом',
		imageUrl: '/assets/img/products/eclairs-mini-with-custard-cream.avif',
		categoryId: 8,
	},
	{
		name: 'Шоколадний кукіс',
		imageUrl: '/assets/img/products/cookies-chocolate.avif',
		categoryId: 8,
	},
	{
		name: 'Фондан',
		imageUrl: '/assets/img/products/fondant.avif',
		categoryId: 8,
	},
	{
		name: 'Мафін Солена карамель',
		imageUrl: '/assets/img/products/muffin-salted-caramel.avif',
		categoryId: 8,
	},
	{
		name: 'Маффін Три шоколади',
		imageUrl: '/assets/img/products/muffin-three-chocolates.avif',
		categoryId: 8,
	},
	{
		name: 'Бруслетики',
		imageUrl: '/assets/img/products/brusletiki.avif',
		categoryId: 8,
	},
	{
		name: 'Сирники зі згущеним молоком',
		imageUrl: '/assets/img/products/cheesecakes-with-condensed-milk.avif',
		categoryId: 8,
	},
	{
		name: 'Сирники з малиновим варенням 👶',
		imageUrl: '/assets/img/products/cheesecakes-with-raspberry-jam.avif',
		categoryId: 8,
	},
	{
		name: 'Сирники',
		imageUrl: '/assets/img/products/cheesecakes.avif',
		categoryId: 8,
	},
	{
		name: 'Курячі шматочки 👶',
		imageUrl: '/assets/img/products/chicken-pieces.avif',
		categoryId: 9,
	},
	{
		name: 'Курячі нагетси',
		imageUrl: '/assets/img/products/chicken-nuggets.avif',
		categoryId: 9,
	},
	{
		name: 'Картопля з печі 🌱👶',
		imageUrl: '/assets/img/products/potatoes-oven-baked.avif',
		categoryId: 9,
	},
	{
		name: 'Сирники з малиновим варенням 👶',
		imageUrl: '/assets/img/products/cheesecakes-with-raspberry-jam.avif',
		categoryId: 9,
	},
	{
		name: 'Сирники зі згущеним молоком',
		imageUrl: '/assets/img/products/cheesecakes-with-condensed-milk.avif',
		categoryId: 9,
	},
	{
		name: 'Медово-гірчичний',
		imageUrl: '/assets/img/products/honey-mustard.avif',
		categoryId: 10,
	},
	{
		name: 'Солодкий чилі',
		imageUrl: '/assets/img/products/sweet-chili.avif',
		categoryId: 10,
	},
	{
		name: 'Сирний',
		imageUrl: '/assets/img/products/cheese.avif',
		categoryId: 10,
	},
	{
		name: 'Часниковий',
		imageUrl: '/assets/img/products/garlic.avif',
		categoryId: 10,
	},
	{
		name: 'Барбекю',
		imageUrl: '/assets/img/products/bbq.avif',
		categoryId: 10,
	},
	{
		name: 'Малинове варення',
		imageUrl: '/assets/img/products/raspberry-jam.avif',
		categoryId: 10,
	},
]

export const storys = [
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
	},
	{
		previewImageUrl:
			'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
	},
]

export const storyItems = [
	{
		storyId: 1,
		sourceUrl: 'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl: 'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl: 'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl: 'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
	},
	{
		storyId: 1,
		sourceUrl: 'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
	},
]
