export const cn = (...classes: (string | undefined)[]): string => {
	if (!classes.length) return '';
	return classes.join(' ');
};
