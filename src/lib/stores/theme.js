import { writable } from 'svelte/store';

const STORAGE_KEY = 'spiked-theme';

function createThemeStore() {
	const { subscribe, set, update } = writable('dark');

	const applyToDom = (theme) => {
		if (typeof document === 'undefined') return;

		const root = document.documentElement;
		root.dataset.theme = theme;
		root.classList.toggle('dark', theme === 'dark');
	};

	const persist = (theme) => {
		if (typeof localStorage === 'undefined') return;
		try {
			localStorage.setItem(STORAGE_KEY, theme);
		} catch (error) {
			console.error('Unable to persist theme preference', error);
		}
	};

	return {
		/** Initialize theme from storage or OS preference */
		init() {
			let theme = 'dark';

			if (typeof localStorage !== 'undefined') {
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored === 'light' || stored === 'dark') {
					theme = stored;
				}
			}

			if (!localStorage?.getItem(STORAGE_KEY) && typeof window !== 'undefined') {
				const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
				theme = prefersDark ? 'dark' : 'light';
			}

			set(theme);
			applyToDom(theme);
		},
		subscribe,
		toggle() {
			update((current) => {
				const next = current === 'dark' ? 'light' : 'dark';
				applyToDom(next);
				persist(next);
				return next;
			});
		},
		setTheme(theme) {
			const next = theme === 'light' ? 'light' : 'dark';
			set(next);
			applyToDom(next);
			persist(next);
		}
	};
}

export const themeStore = createThemeStore();
