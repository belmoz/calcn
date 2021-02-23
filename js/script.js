// Подключение файлов =====================================================
// SlideToggle
let _slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.classList.remove('_slide');
    }, duration);
}
let _slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none')
        display = 'flex';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
    }, duration);
}
let _slideToggle = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (window.getComputedStyle(target).display === 'none') {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
}
// ==============================================
// inMobile
let _inMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
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
			lostHour.innerHTML = "максимум " + (norm * day);
		}



	});
}

let infoSpoller = document.querySelector('.info__spoller');
let infoBlock = document.querySelector('.info__block');

infoSpoller.addEventListener('click', function (e) {
	this.classList.toggle('_active');
	// infoBlock.classList.toggle('_active');
	_slideToggle(infoBlock);
});

//=================================================================================================================
