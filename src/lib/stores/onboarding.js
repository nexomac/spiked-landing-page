import { writable } from 'svelte/store';

function createOnboardingStore() {
	const { subscribe, set, update } = writable({
		isActive: false,
		currentStep: 0,
		completed: false,
		userData: {
			name: '',
			email: '',
			role: '',
			company: '',
			teamSize: '',
			useCases: [],
			primaryGoal: '',
			integrations: [],
			currentTools: []
		}
	});

	return {
		subscribe,
		start: () => update(state => ({ ...state, isActive: true, currentStep: 0 })),
		close: () => update(state => ({ ...state, isActive: false })),
		nextStep: () => update(state => ({ ...state, currentStep: state.currentStep + 1 })),
		prevStep: () => update(state => ({ ...state, currentStep: Math.max(0, state.currentStep - 1) })),
		goToStep: (step) => update(state => ({ ...state, currentStep: step })),
		updateUserData: (data) => update(state => ({ 
			...state, 
			userData: { ...state.userData, ...data } 
		})),
		complete: () => update(state => ({ 
			...state, 
			completed: true, 
			isActive: false 
		})),
		reset: () => set({
			isActive: false,
			currentStep: 0,
			completed: false,
			userData: {
				name: '',
				email: '',
				role: '',
				company: '',
				teamSize: '',
				useCases: [],
				primaryGoal: '',
				integrations: [],
				currentTools: []
			}
		})
	};
}

export const onboardingStore = createOnboardingStore();
