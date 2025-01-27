const ID_VALID_LENGTH = 11;
const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

export function validateId (id: string) {
	id = id.replace(/\D/g, "");
	if (id.length !== ID_VALID_LENGTH) return false;
	if (allDigitsAreTheSame(id)) return false;
	const digit1 = calculateDigit(id, FIRST_DIGIT_FACTOR);
	const digit2 = calculateDigit(id, SECOND_DIGIT_FACTOR);
	return `${digit1}${digit2}` === extractDigit(id);
}

function allDigitsAreTheSame (id: string) {
	const [firstDigit] = id;
	return [...id].every(digit => digit === firstDigit);
}

function calculateDigit (id: string, factor: number) {
	let total = 0;
	for (const digit of id) {
		if (factor > 1) total += parseInt(digit) * factor--;
	}
	const remainder = total % 11;
	return (remainder < 2) ? 0 : 11 - remainder;
}

function extractDigit (id: string){
	return id.slice(9);
}
