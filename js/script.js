// Подключение файлов =====================================================
// слайдеры  ===================================================
let dayChecked = document.querySelectorAll(".selectDay__input");
let daySlider = document.querySelector(".selectDay__slider");
function checkD() {
	for (let i = 0; i < dayChecked.length; i++) {
		if (dayChecked[i].type == "radio" && dayChecked[i].checked) {
			dayChecked[i].classList.add("_active");
			daySlider.style = "transform: translateX(" + i * 100 + "%);";
		} else {
			dayChecked[i].classList.remove("_active");
		}
	}
}

let machCount = document.querySelectorAll(".selectMachCount__input");
let machSlider = document.querySelector(".selectMachCount__slider");

function checkMC() {
	for (let i = 0; i < machCount.length; i++) {
		if (machCount[i].type == "radio" && machCount[i].checked) {
			machCount[i].classList.add("_active");
			machSlider.style = "transform: translateX(" + i * 100 + "%);";
		} else {
			machCount[i].classList.remove("_active");
		}

	}
}

/*
ЗАДАЧА: Рассчёт премии.
		Необходимая норма
		Недостаток нормы относительно кол-ва машин + Недостаток времени до нормы
		Определение времени на заданное количество

ПСЕВДОКОД:
Создать переменную для определения кол-ва машин (Км); v
Создать 3 переменных для заданного количества (Зк); v
Создать 3 переменных для типа ленты (типЛенты); v
Создать переменную рабочийДень (количество рабочих часов в день); v
Прослушать заданное количество для каждой переменной; v

Ищем БЛОК СТРОКИ и задаем ей ПЕРЕМЕННУЮ
Перебираем каждый БЛОК СТРОКИ
В каждом БЛОКЕ СТРОКИ[i] ищем ТИП ЛЕНТЫ и задаём этому всему ПЕРЕМЕННУЮ
В каждом БЛОКЕ СТРОКИ[i] ищем ВВЕДЕННОЕ КОЛИЧЕСТВО и задаём этому всему ПЕРЕМЕННУЮ
В каждом БЛОКЕ СТРОКИ[i] ищем РАССЧЁТ ВРЕМЕНИ и задаём этому всему ПЕРЕМЕННУЮ

Необходимые  переменные:
	Норма 0805
	норма 1206
	норма 2010
	норма 2512



*/




let selectMachCount = document.querySelector('.selectMachCount');


// графа Количество
let typeStrips = document.querySelectorAll('.typeStrip');
let completedCounts = document.querySelectorAll('.completedCount__input');
let lostHours = document.querySelectorAll('.lostHours');
let total = document.querySelector('.total');

for (let i = 0; i < completedCounts.length; i++) {
	const completedCount = completedCounts[i];
	const typeStrip = typeStrips[i];
	let lostHour = lostHours[i];

	total.addEventListener('click', function (e) {

		const day = document.querySelector('.selectDay__input._active').value;
		const machCount = document.querySelector('.selectMachCount__input._active').value;


		if (machCount == "2") {
			if (typeStrip.value == 0805) {
				norm = 247000;
			} else if (typeStrip.value == 1206) {
				norm = 214500;
			} else if (typeStrip.value == 2010) {
				norm = 175500;
			} else if (typeStrip.value == 2512) {
				norm = 188500;
			}
		} else {
			if (typeStrip.value == 0805) {
				norm = 234000;
			} else if (typeStrip.value == 1206) {
				norm = 201500;
			} else if (typeStrip.value == 2010) {
				norm = 169000;
			} else if (typeStrip.value == 2512) {
				norm = 175500;
			}
		}
		norm = norm / 11;

		//определние остатка часов до нормы
		lostHour.innerHTML = (new Date((norm * day - completedCount.value) / norm * 3600000)).getHours() - 2 + ":" + ('0' + (new Date((norm * day - completedCount.value) / norm * 3600000)).getMinutes()).slice(-2);

		if (completedCount.value > norm * day) {
			lostHour.innerHTML = "максимум " + Math.floor(norm * day);
		}



	});
}
// определение нормы в день относительно рабочих часов и типа ленты


//определние остатка часов до нормы
// let lostHours1 = (new Date((dayNorm(typeStrip) - completedCount1) / normHour * 3600000)).getHours() - 2 + ":" + (new Date((dayNorm(typeStrip1) - completedCount1) / normHour * 3600000)).getMinutes();

//=================================================================================================================
